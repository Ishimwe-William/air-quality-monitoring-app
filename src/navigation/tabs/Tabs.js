import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SettingsScreen from '../../screens/SettingScreen';
import HomeStack from '../stacks/HomeStack';
import DashboardStack from '../stacks/DashboardStack';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator tabBarPosition="bottom">
      <Tab.Screen name="HomeStack" component={HomeStack} options={{
        tabBarLabel: "Home",
      }} />
      <Tab.Screen name="DashboardStack" component={DashboardStack} options={{
        tabBarLabel: "Dashboard",
      }} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs;