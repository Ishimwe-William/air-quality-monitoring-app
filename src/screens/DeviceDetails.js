import { useState } from "react";
import { Alert, ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import { readRTDBData } from "../utils/rtdbUtils";
import { CircularGraph } from "../components/CircularGraph";
import {MyButton} from "../components/MyButton"
export const DeviceDetails = () => {
  const [sensorData, setSensorData] = useState(null);
  const { width, height } = useWindowDimensions();

  const handleReadData = () => {
    readRTDBData()
      .then((data) => {
        setSensorData(data);
        console.log("Top 10 Data:", data);
      })
      .catch((error) => {
        console.error("Error reading data:", error);
      });
  };

  // Check if the screen is in landscape
  const isLandscape = width > height;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MyButton HandleOnPress={handleReadData} ButtonText={"Console Data"} />
      <View style={[styles.gaugeRow, isLandscape && styles.gaugeRowLandscape]}>
        <CircularGraph
          handleOnPress={() => Alert.alert("Temperature", "Temperature Value")}
          data={29} symbol={"°C"}
          iconName={"thermometer-outline"}
          graphTitle={"Temperature Value"}
        />

        <CircularGraph
          handleOnPress={() => Alert.alert("Humidity", "Humidity Value")}
          data={70}
          symbol={"%"}
          iconName={"water-outline"}
          graphTitle={"Humidity Value"}
          backColor="#ecdde0"
        />

      </View>
      <View style={[styles.gaugeRow, isLandscape && styles.gaugeRowLandscape]}>
        <CircularGraph
          handleOnPress={() => Alert.alert("CO2", "CO2 Value")}
          data={90}
          maxValue={1000}
          symbol={"PPM"}
          iconName={"car-outline"}
          graphTitle={"CO2 Gas"}
          backColor={"#ece6dd"} />

        <CircularGraph
          handleOnPress={() => Alert.alert("NH3", "NH3 Value")}
          data={426.5}
          maxValue={1000}
          symbol={"PPM"}
          iconName={"cloud-outline"}
          graphTitle={"NH4 Gas"}
          backColor="#dde1ec" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  gaugeRow: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  gaugeRowLandscape: {
    flexDirection: 'row',  // Row layout for landscape
    justifyContent: 'center',
  },
});
