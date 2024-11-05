import { StyleSheet, Text, View } from "react-native";
import {useNavigation} from '@react-navigation/native'
import { MyButton } from "../components/MyButton";

export default function HomeScreen() {
  const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <MyButton HandleOnPress={()=>navigation.navigate('Profile')} ButtonText={"Go To Profile"}/>
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
  