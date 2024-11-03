import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export const MyButton = ({ HandleOnPress, ButtonText }) => {
    return (
        <View>
            <TouchableOpacity onPress={HandleOnPress}>
                <Text style={styles.button}>{ButtonText}</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        color: 'blue',
        padding: 5,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'blue',
    }
})