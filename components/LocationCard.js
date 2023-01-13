import React, { useState } from 'react'
import { View, Text, StyleSheet, Animated, LogBox } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/Feather'

/**
 * @class
 * It's a custom Text component that loads fonts from the assets folder
 * @param props - {}
 * @returns A function that returns a component.
 * @category Component
 */
const LocationButton = (props) => {
    const [isSelected, setIsSelected] = useState(false)
    const [animation, setAnimation] = useState(new Animated.Value(0))

    const boxInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange:['#00B4D8' , '#FFF']
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

    return (
        <Animated.View
            onStartShouldSetResponder={
                () => (
                    handleAnimation(),
                    props.assertToItinerary([props.name, props.description], !isSelected),
                    setIsSelected(!isSelected)
                )
            }
            style={[styles.card, animatedStyle]}
        >
            <Text style={styles.title}>{props.name}</Text>
            <Text style={styles.description}>{props.description}</Text>
        </Animated.View>
    )
}

const cardColor = '#00B4D8'
const styles = StyleSheet.create({
    card: {
        flex: 1,
        padding: 25,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: cardColor
    },
    title: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18
    },
    description: {
        color: '#FFF',
        fontSize: 16
    }
})

export default LocationButton