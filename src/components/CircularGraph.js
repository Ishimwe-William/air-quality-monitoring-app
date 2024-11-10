import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export const CircularGraph = ({ data, symbol, iconName, graphTitle, backColor = "#ddecec", handleOnPress, maxValue = 100 }) => {
    const fillData = data * 100 / maxValue;

    return (
        <View style={[styles.gaugeContainer, { backgroundColor: backColor }]} >
            <Text style={styles.title}>{graphTitle}</Text>
            <AnimatedCircularProgress
                size={180}
                width={15}
                fill={fillData}
                tintColor="#00e0ff"
                backgroundWidth={20}
                lineCap="round"
                backgroundColor="#3d5875"
            >
                {
                    (fill) => (
                        <>
                            <TouchableOpacity style={styles.dataText} onPress={handleOnPress}>
                                <Ionicons name={iconName} size={35} color="green" style={styles.icon} />
                                <View style={styles.row}>
                                    <Text style={styles.dataText}>{`${data.toFixed(2)}`} </Text>
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
   title: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 2,
        color: '#3d5875',
    },
    dataText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#3d5875',
    },
    symbolText: {
        fontSize: 16,
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
        width:280,
        alignItems:'center',
        padding: 5,
        borderRadius: 10,
        margin: 10,
    },
})