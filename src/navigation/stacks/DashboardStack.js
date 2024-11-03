import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import DashboardScreen from '../../screens/DashboardScreen';

const Stack = createStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}