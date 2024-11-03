import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export const CircularGraph = ({ data, symbol, iconName, graphTitle, backColor = "#ddecec" , handleOnPress}) => {
    return (
        <View style={[styles.gaugeContainer, { backgroundColor: backColor}]} >
            <Text style={styles.title}>{graphTitle}</Text>
            <AnimatedCircularProgress
                size={200}
                width={15}
                fill={data}
                tintColor="#00e0ff"
                backgroundWidth={28}
                lineCap="round"
                backgroundColor="#3d5875"
            >
                {
                    (fill) => (
                        <>
                            <TouchableOpacity style={styles.dataText} onPress={handleOnPress}>
                                <Ionicons name={iconName} size={50} color="green" style={styles.icon} />
                                <View style={styles.row}>
                                    <Text style={styles.dataText}>{data} </Text>
                                    <Text style={styles.symbolText}>{symbol}</Text>
                                </View>
                            </TouchableOpacity>
                        </>
                    )
                }
            </AnimatedCircularProgress>
        </View >
    )
}

const styles = StyleSheet.create({
    dataText: {
        fontSize: 30,
        fontWeight: '600',
        color: '#3d5875',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 5,
        color: '#3d5875',
    },
    symbolText: {
        fontSize: 18,
        color: '#3d5875',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        alignSelf: 'center',
    },
    gaugeContainer: {
        padding: 20,
        borderRadius: 10,
        margin: 10,
    },
})