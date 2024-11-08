import { useEffect, useState } from "react";
import { Alert, RefreshControl, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { readRTDBData } from "../utils/rtdbUtils";
import { CircularGraph } from "../components/CircularGraph";
import { useRoute } from '@react-navigation/native';

export const DeviceDetails = () => {
  const route = useRoute();
  const [sensorData, setSensorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { width, height } = useWindowDimensions();

  const { station } = route.params || {}; // Correct parameter destructuring

  useEffect(() => {
    if (station) {
      setSensorData(station);
    }
  }, [station]);

  const fetchData = async (data) => {
    setIsLoading(true);
    try {
      setSensorData(data);
    } catch (error) {
      console.error("Error reading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isLandscape = width > height;

  return (
    <ScrollView contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={fetchData}
        />
      }
    >
      <Text>{sensorData?.station_name}</Text>
      <View style={[styles.gaugeRow, isLandscape && styles.gaugeRowLandscape]}>
        <CircularGraph
          handleOnPress={() => Alert.alert("Temperature", `Temperature Value: ${sensorData?.temperature}°C`)}
          data={sensorData?.temperature || 0}
          symbol={"°C"}
          iconName={"thermometer-outline"}
          graphTitle={"Temperature Value"}
        />
        <CircularGraph
          handleOnPress={() => Alert.alert("Humidity", `Humidity Value: ${sensorData?.humidity}%`)}
          data={sensorData?.humidity || 0}
          symbol={"%"}
          iconName={"water-outline"}
          graphTitle={"Humidity Value"}
          backColor="#ecdde0"
        />
      </View>
      <View style={[styles.gaugeRow, isLandscape && styles.gaugeRowLandscape]}>
        <CircularGraph
          handleOnPress={() => Alert.alert("CO2", `CO2 Value: ${sensorData?.CO2} PPM`)}
          data={sensorData?.CO2 || 0}
          maxValue={1000}
          symbol={"PPM"}
          iconName={"car-outline"}
          graphTitle={"CO2 Gas"}
          backColor={"#ece6dd"}
        />
        <CircularGraph
          handleOnPress={() => Alert.alert("NH3", `NH3 Value: ${sensorData?.NH4} PPM`)}
          data={sensorData?.NH4 || 0}
          maxValue={1000}
          symbol={"PPM"}
          iconName={"cloud-outline"}
          graphTitle={"NH4 Gas"}
          backColor="#dde1ec"
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
    flexDirection: 'row',  // Row layout for landscape
    justifyContent: 'center',
  },
});