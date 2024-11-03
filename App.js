import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import NavTabs from './src/navigation/tabs/Tabs'
import { NavigationContainer } from '@react-navigation/native';
// import Graph from './src/components/MyGraph';

export default function App() {
  return (
    <NavigationContainer>
      <NavTabs/>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}

