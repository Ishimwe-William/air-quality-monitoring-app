import { useEffect, useState } from "react";
import { Alert, RefreshControl, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { CircularGraph } from "../components/CircularGraph";
import { useRoute } from '@react-navigation/native';
import { ref, onValue, off } from 'firebase/database'; // Import Firebase functions
import { rtdb } from "../config/firebaseConfig";

export const DeviceDetails = () => {
  const route = useRoute();
  const [sensorData, setSensorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stationId, setStationId] = useState(null);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (route.params?.stationId) {
      setStationId(route.params.stationId);
    }
  }, [route.params?.stationId]);

  useEffect(() => {
    if (stationId) {
      const stationRef = ref(rtdb, `/stations/data/${stationId}`);

      // Set up a real-time listener
      const listener = onValue(
        stationRef,
        (snapshot) => {
          setIsLoading(false);
          if (snapshot.exists()) {
            const stationData = snapshot.val();
            const latestEntryKey = Object.keys(stationData).pop();
            const latestData = stationData[latestEntryKey];

            if (latestData && latestData.latitude && latestData.longitude) {
              setSensorData(latestData);
            } else {
              setSensorData(null);
            }
          } else {
            setSensorData(null);
          }
        },
        (error) => {
          setIsLoading(false);
          console.error("Error reading data:", error);
        }
      );

      // Clean up listener on unmount or when stationId changes
      return () => {
        off(stationRef, "value", listener);
      };
    }
  }, [stationId]);

  const isLandscape = width > height;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            setIsLoading(true);
            setStationId(route.params?.stationId);
            setIsLoading(false);
          }}
        />
      }
    >
      <Text style={styles.title}>{sensorData?.station_name || "No data available"}</Text>
      <Text style={styles.date}>{sensorData?.last_updated || "Last updated data not available"}</Text>
      <View style={[styles.gaugeRow, isLandscape && styles.gaugeRowLandscape]}>
        <CircularGraph
          handleOnPress={() => Alert.alert("Temperature", `Temperature Value: ${sensorData?.temperature || "N/A"}°C`)}
          data={sensorData?.temperature || 0}
          symbol={"°C"}
          iconName={"thermometer-outline"}
          graphTitle={"Temperature Value"}
        />
        <CircularGraph
          handleOnPress={() => Alert.alert("Humidity", `Humidity Value: ${sensorData?.humidity || "N/A"}%`)}
          data={sensorData?.humidity || 0}
          symbol={"%"}
          iconName={"water-outline"}
          graphTitle={"Humidity Value"}
          backColor="#ecdde0"
        />
      </View>

      <View style={[styles.gaugeRow, isLandscape && styles.gaugeRowLandscape]}>
        <CircularGraph
          handleOnPress={() => Alert.alert("CO2", `CO2 Value: ${sensorData?.CO2 || "N/A"} PPM`)}
          data={sensorData?.CO2 || 0}
          maxValue={1000}
          symbol={"PPM"}
          iconName={"car-outline"}
          graphTitle={"CO2 Gas"}
          backColor={"#e2ddec"}
        />
        <CircularGraph
          handleOnPress={() => Alert.alert("CO", `CO Value: ${sensorData?.CO || "N/A"} PPM`)}
          data={sensorData?.CO || 0}
          maxValue={1000}
          symbol={"PPM"}
          iconName={"car-outline"}
          graphTitle={"CO Gas"}
          backColor={"#ece6dd"}
        />
      </View>

      <View style={[styles.gaugeRow, isLandscape && styles.gaugeRowLandscape]}>
        <CircularGraph
          handleOnPress={() => Alert.alert("Alcohol", `Alcohol Value: ${sensorData?.Alcohol || "N/A"} PPM`)}
          data={sensorData?.Alcohol || 0}
          maxValue={1000}
          symbol={"PPM"}
          iconName={"car-outline"}
          graphTitle={"Alcohol Gas"}
          backColor={"#ddece2"}
        />
        <CircularGraph
          handleOnPress={() => Alert.alert("NH3", `NH3 Value: ${sensorData?.NH4 || "N/A"} PPM`)}
          data={sensorData?.NH4 || 0}
          maxValue={1000}
          symbol={"PPM"}
          iconName={"cloud-outline"}
          graphTitle={"NH3 Gas"}
          backColor="#ebecdd"
        />
      </View>

      <View style={[styles.gaugeRow, isLandscape && styles.gaugeRowLandscape]}>
        <CircularGraph
          handleOnPress={() => Alert.alert("Toluen", `Toluen Value: ${sensorData?.Toluen || "N/A"} PPM`)}
          data={sensorData?.Toluen || 0}
          maxValue={1000}
          symbol={"PPM"}
          iconName={"cloud-outline"}
          graphTitle={"Toluen Gas"}
          backColor="#ece3dd"
        />
        <CircularGraph
          handleOnPress={() => Alert.alert("Aceton", `Aceton Value: ${sensorData?.Aceton || "N/A"} PPM`)}
          data={sensorData?.Aceton || 0}
          maxValue={1000}
          symbol={"PPM"}
          iconName={"cloud-outline"}
          graphTitle={"Aceton Gas"}
          backColor="#eaddec"
        />
      </View>
    </ScrollView>
  );
};

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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title:{
    fontSize:24,
  },
  date:{
    fontSize:12,
    fontWeight:'300',
  },
});
