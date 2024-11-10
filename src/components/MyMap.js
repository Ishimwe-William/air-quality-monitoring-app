import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

export const MyMap = ({ coordinates }) => {
    const navigation = useNavigation();
    const [mapType, setMapType] = useState('standard');
    const mapViewRef = useRef(null);
    const [locationData, setLocationData] = useState(null);
    const [hasPermission, setHasPermission] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [initialRegion, setInitialRegion] = useState({
        latitude: -1.698774,
        longitude: 29.256043,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Permission to access location was denied');
                setIsLoading(false);
                return;
            }

            setHasPermission(true);
            const location = await Location.getCurrentPositionAsync({});
            const userLocation = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
            setLocationData(userLocation);
            setInitialRegion(calculateNearestStation(userLocation)); // Update initial region based on nearest station
            setIsLoading(false);
        })();
    }, []);

    // Function to calculate the nearest station
    const calculateNearestStation = (userLocation) => {
        if (!coordinates || Object.keys(coordinates).length === 0) return initialRegion;

        let nearestStation = null;
        let minDistance = Infinity;

        Object.keys(coordinates).forEach((stationId) => {
            const station = coordinates[stationId];
            const distance = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                station.latitude,
                station.longitude
            );
            if (distance < minDistance) {
                minDistance = distance;
                nearestStation = station;
            }
        });

        if (nearestStation) {
            return {
                latitude: nearestStation.latitude,
                longitude: nearestStation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            };
        }
        return initialRegion; // Fallback if no nearest station is found
    };

    // Function to calculate distance between two coordinates (Haversine formula)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371; // Radius of the Earth in km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };

    const toggleMapType = () => {
        setMapType((prevType) => (prevType === 'standard' ? 'hybrid' : 'standard'));
    };

    const handleCalloutPress = (stationId) => {
        navigation.navigate('DeviceDetails', { stationId });
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading map...</Text>
            </View>
        );
    }

    if (!hasPermission) {
        return <Text style={styles.errorText}>Location permission is required to display the map.</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                ref={mapViewRef}
                style={{ flex: 1 }}
                initialRegion={initialRegion}
                mapType={mapType}
            >
                {Object.keys(coordinates).map((stationId) => {
                    const station = coordinates[stationId];
                    return (
                        <Marker
                            key={stationId}
                            coordinate={{ latitude: station.latitude, longitude: station.longitude }}
                            title={`Station ${stationId}`}
                            description="Click for more details"
                        >
                            <Callout onPress={() => handleCalloutPress(stationId)}>
                                <View style={styles.calloutTextCont}>
                                    <Text style={styles.calloutText}>{station.station_name || `Station ${stationId}`}</Text>
                                    <Text style={styles.calloutTextDesc}>Click to view data</Text>
                                </View>
                            </Callout>
                        </Marker>
                    );
                })}
            </MapView>

            <TouchableOpacity
                onPress={toggleMapType}
                style={[styles.floatButton, { bottom: 60, right: 20 }]}
            >
                <Text style={[styles.floatButtonText, { color: mapType === 'hybrid' ? 'yellow' : 'orange' }]}>
                    {mapType === 'standard' ? 'Satellite' : 'Standard'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    floatButton: {
        position: 'absolute',
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    calloutTextCont: {
        justifyContent: 'center',
    },
    calloutText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    calloutTextDesc: {
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        color: 'blue',
    },
});
