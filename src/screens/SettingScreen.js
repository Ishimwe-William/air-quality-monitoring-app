import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { updateSystemStatus, readRTDBData } from "../utils/rtdbUtils"; // Assuming readRTDBData reads the specific state path
import { MyButton } from "../components/MyButton";
import { ref, onValue } from 'firebase/database';
import { rtdb } from "../config/firebaseConfig";

export default function SettingsScreen() {
  const [systemState, setSystemState] = useState(false);

  useEffect(() => {
    const statusRef = ref(rtdb, "/statuses/status");
    const unsubscribe = onValue(statusRef, (snapshot) => {
      if (snapshot.exists()) {
        const status = snapshot.val();
        setSystemState(status);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleToggleSystemState = () => {
    const newState = !systemState;
    setSystemState(newState);  
    updateSystemStatus(newState);
  };

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Text>Current System State: {systemState ? "On" : "Off"}</Text>
      <MyButton HandleOnPress={handleToggleSystemState} ButtonText={"Toggle System State"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
