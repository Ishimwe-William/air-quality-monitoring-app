import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { MyMap } from "../components/MyMap";
import { readLatestCoordinatesForStations } from '../utils/rtdbUtils';

export const DevicesScreen = () => {
    const [latestCoordinates, setLatestCoordinates] = useState(null);

    useEffect(() => {
        // Fetch the latest coordinates when the component mounts
        const fetchCoordinates = async () => {
            try {
                const coordinates = await readLatestCoordinatesForStations();
                setLatestCoordinates(coordinates);
            } catch (error) {
                console.error("Error fetching coordinates:", error);
            }
        };

        fetchCoordinates();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Pass latestCoordinates as a prop to MyMap */}
            {latestCoordinates ? (
                <MyMap coordinates={latestCoordinates} />
            ) : (
                <Text>Loading coordinates...</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
});
