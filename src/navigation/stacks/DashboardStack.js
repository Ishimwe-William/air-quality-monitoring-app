import { createStackNavigator } from '@react-navigation/stack';
import { DevicesScreen } from '../../screens/DevicesScreen';
import { DeviceDetails } from '../../screens/DeviceDetails';
const Stack = createStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DevicesScreen" component={DevicesScreen} options={{
        title: "Devices"
      }} />
      <Stack.Screen name="DeviceDetails" component={DeviceDetails} options={{
        title: "Device Details"
      }} />
    </Stack.Navigator>
  );
}