import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { MyButton } from "../components/MyButton";
import { readRTDBData } from "../utils/rtdbUtils";

export default function DashboardScreen() {
  const [sensorData, setSensorData] = useState(null);

  const handleReadData = () => {
    readRTDBData()
      .then((data) => {
        setSensorData(data);
        console.log("Top 10 Data:", data);  // Log data directly here
      })
      .catch((error) => {
        console.error("Error reading data:", error);
      });
  };

  return (
    <ScrollView contentContainerStyle={[{flexGrow:1 },styles.container]}>
      <Text>Dashboard Screen</Text>
      {sensorData ? (
        <Text>{JSON.stringify(sensorData, null, 2)}</Text>  // Display sensor data
      ) : (
        <Text>No data loaded</Text>
      )}
      <MyButton HandleOnPress={handleReadData} ButtonText={"Read Data"} />
    </ScrollView>
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
