import { ref, query, onValue, set } from 'firebase/database';
import { rtdb } from "../config/firebaseConfig";

export const readLatestCoordinatesForStations = () => {
  const stationsRef = ref(rtdb, "/stations/data");

  return new Promise((resolve, reject) => {
    onValue(
      stationsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const stationsData = snapshot.val();
          const latestCoordinates = {};

          for (const stationId in stationsData) {
            const stationEntries = stationsData[stationId];
            const latestEntryKey = Object.keys(stationEntries).pop();
            const latestEntry = stationEntries[latestEntryKey];

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

// export const getDataFromSource = (stationId) => {
//   return new Promise((resolve, reject) => {
//     if (!stationId) {
//       reject(new Error("Station ID is required to fetch data"));
//       return;
//     }

//     const stationRef = ref(rtdb, `/stations/data/${stationId}`);

//     onValue(
//       stationRef,
//       (snapshot) => {
//         if (snapshot.exists()) {
//           const stationData = snapshot.val();
//           const latestEntryKey = Object.keys(stationData).pop();
//           const latestData = stationData[latestEntryKey];

//           if (latestData && latestData.latitude && latestData.longitude) {
//             resolve(latestData);
//           } else {
//             reject(new Error("Data is incomplete or missing latitude/longitude"));
//           }
//         } else {
//           reject(new Error("No data found for this station ID"));
//         }
//       },
//       (error) => {
//         reject(error);
//       }
//     );
//   });
// };

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
