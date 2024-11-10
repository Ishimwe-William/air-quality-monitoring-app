import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { MyMap } from "../components/MyMap";
import { readLatestCoordinatesForStations } from '../utils/rtdbUtils';

export const DevicesScreen = () => {
    const [latestCoordinates, setLatestCoordinates] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the latest coordinates when the component mounts
        const fetchCoordinates = async () => {
            try {
                const coordinates = await readLatestCoordinatesForStations();
                setLatestCoordinates(coordinates);
            } catch (error) {
                console.error("Error fetching coordinates:", error);
                setError("Failed to load coordinates.");
            }
        };

        fetchCoordinates();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {error ? (
                <View style={styles.centeredView}>
                    <Text style={{ color: 'red' }}>{error}</Text>
                </View>
            ) : (
                latestCoordinates ? (
                    <MyMap coordinates={latestCoordinates} />
                ) : (
                    <View style={styles.centeredView}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text>Loading coordinates...</Text>
                    </View>
                )
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    centeredView: {
        alignItems: 'center',
    },
});
