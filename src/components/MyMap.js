import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export const MyMap = () => {
    const navigation = useNavigation(); // Hook to navigate to DeviceDetails screen
    const [mapType, setMapType] = useState('standard');
    const mapViewRef = useRef(null);
    const [locationData, setLocationData] = useState({
        latitude: -1.698774,
        longitude: 29.256043,
    });
    const [hasPermission, setHasPermission] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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
            setLocationData({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
            setIsLoading(false);
        })();
    }, []);

    const toggleMapType = () => {
        setMapType((prevType) => (prevType === 'standard' ? 'hybrid' : 'standard'));
    };

    const centerOnLocation = () => {
        if (mapViewRef.current) {
            mapViewRef.current.animateToRegion(
                {
                    latitude: locationData.latitude,
                    longitude: locationData.longitude,
                    latitudeDelta: 0.004,
                    longitudeDelta: 0.004,
                },
                500
            );
        }
    };

    const handleCalloutPress = () => {
        navigation.navigate('DeviceDetails'); // Navigate to DeviceDetails screen when callout is pressed
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
                initialRegion={{
                    latitude: locationData.latitude,
                    longitude: locationData.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                mapType={mapType}
            >
                <Marker
                    coordinate={{ latitude: locationData.latitude, longitude: locationData.longitude }}
                    title="Sensor Location"
                    description="description"
                >
                    <Callout onPress={handleCalloutPress}>
                        <View style={styles.calloutTextCont}>
                            <Text style={styles.calloutText}>CMU-Africa Station</Text>
                            <Text style={styles.calloutTextDesc}>Click to view data</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>

            <TouchableOpacity
                onPress={toggleMapType}
                style={[styles.floatButton, { bottom: 60, right: 20 }]}
            >
                <Text style={[styles.floatButtonText, { color: mapType === 'hybrid' ? 'yellow' : 'orange' }]}>
                    {mapType === 'standard' ? 'Satellite' : 'Standard'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={centerOnLocation}
                style={[styles.floatButton, { bottom: 120, right: 20 }]}
            >
                <Text style={[styles.floatButtonText, { color: mapType === 'hybrid' ? 'yellow' : 'orange' }]}>
                    Re-center
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