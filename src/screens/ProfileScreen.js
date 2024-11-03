import { StyleSheet, Text, View } from "react-native";
import { MyButton } from "../components/MyButton";
import { useNavigation } from '@react-navigation/native'

export default function ProfileScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
            <MyButton HandleOnPress={() => navigation.goBack()} ButtonText={"Go Back"} />

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
