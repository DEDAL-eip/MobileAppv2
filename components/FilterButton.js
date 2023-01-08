import React, { useState } from 'react'
import { View, Text, StyleSheet, Animated, LogBox } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/Feather'

/**
 * @class
 * @param props - {}
 * @returns A function that returns a View clickable with a state, an icon and a text.
 * @category Component
 */
const FilterButton = (props) => {
    const [isSelected, setIsSelected] = useState(false)
    const [animation, setAnimation] = useState(new Animated.Value(0))

    const boxInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange:['#00B4D8' , '#7B61FF']
    })
    const animatedStyle = {
        backgroundColor: boxInterpolation
    }

    const handleAnimation = () => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        if (isSelected)
            Animated.timing(animation, {
                toValue: 0,
                duration: 200
            }).start()
        else
            Animated.timing(animation,{
                toValue: 1,
                duration: 200
            }).start()
    }
    
    if (props.text == null)
        return (
            <View style={[styles.card, styles.coming]}>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="clock" color={'#FFF'} size={30} />
                    <Text style={styles.text}>INCOMING</Text>
                </View>
            </View>
        )
    return (
        <Animated.View
            onStartShouldSetResponder={
                () => (
                    handleAnimation(),
                    props.assertToContext(props.text, !isSelected),
                    setIsSelected(!isSelected)
                )
            }
            style={[styles.card, animatedStyle]}
        >
            <View style={styles.row}>
                <MaterialCommunityIcons name="user" color={'#FFF'} size={30} />
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '45%',
        padding: 25,
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 10
    },
    text: {
        color: '#FFF',
        fontSize: 18,
    },
    coming: {
        backgroundColor: '#C4C4C4'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default FilterButton