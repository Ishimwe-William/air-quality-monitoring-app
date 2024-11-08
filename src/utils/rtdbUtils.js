import { ref, query, onValue, set, orderByKey, limitToLast } from 'firebase/database';
import { rtdb } from "../config/firebaseConfig";

export const readLatestCoordinatesForStations = () => {
    const stationsRef = ref(rtdb, "/stations/data");

    // Use query for each station_id to get the latest data
    return new Promise((resolve, reject) => {
        onValue(
            stationsRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const stationsData = snapshot.val();
                    const latestCoordinates = {};

                    // Iterate through each station_id
                    for (const stationId in stationsData) {
                        const stationEntries = stationsData[stationId];
                        const latestEntryKey = Object.keys(stationEntries).pop(); // Retrieve last key (latest data)
                        const latestEntry = stationEntries[latestEntryKey];

                        // Store latitude and longitude for each station_id
                        if (latestEntry.latitude && latestEntry.longitude) {
                            latestCoordinates[stationId] = latestEntry;
                        }
                    }

                    resolve(latestCoordinates);
                } else {
                    resolve(null);
                }
            },
            (error) => {
                reject(error);
            }
        );
    });
};


export const updateSystemStatus = (status) => {
    const statusRef = ref(rtdb, "/statuses/status");

    set(statusRef, status)
        .then(() => {
            console.log(`System status updated to ${status}`);
        })
        .catch((error) => {
            console.error(`Error updating status:`, error);
        });
};
