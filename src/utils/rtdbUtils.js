import { ref, query, limitToFirst, onValue, set } from 'firebase/database';
import { rtdb } from "../config/firebaseConfig";

export const readRTDBData = () => {
    const dataRef = ref(rtdb, "/data");
    const topTenQuery = query(dataRef, limitToFirst(10));

    return new Promise((resolve, reject) => {
        onValue(
            topTenQuery,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    resolve(data);
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
        console.log(`Status for System updated to ${status}`);
      })
      .catch((error) => {
        console.error(`Error updating status:`, error);
      });
  };