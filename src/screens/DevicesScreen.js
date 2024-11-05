import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native'
import { MyButton } from "../components/MyButton";

export const DevicesScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>All Devices</Text>
            <MyButton HandleOnPress={() => navigation.navigate('DeviceDetails')} ButtonText={"View Device"} />
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
