import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SettingsScreen from '../../screens/SettingScreen';
import HomeStack from '../stacks/HomeStack';
import DashboardScreen from '../../screens/DashboardScreen';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator tabBarPosition="bottom">
      <Tab.Screen name="HomeStack" component={HomeStack} options={{
        tabBarLabel: "Home",
      }} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs;