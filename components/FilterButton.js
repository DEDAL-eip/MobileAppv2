import { textAlign } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Animated, LogBox } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/Feather'
import Colors from '../constants/Colors'

/**
 * @class
 * @param props - {}
 * @returns A function that returns a View clickable with a state, an icon and a text.
 * @category Component
 */
const FilterButton = (props) => {
    const [isSelected, setIsSelected] = useState(props.selected.includes(props.elem ? props.elem.id : 0))
    const [outPutRange, setRange] = useState([Colors('dedalBlue') , Colors('dedalBlueDisable')]) 
    const animation = new Animated.Value(0)
    
    useEffect(() => {
        setIsSelected(props.selected.includes(props.elem ? props.elem.id : 0))
    },[props])

    useEffect(() => {
        setRange(isSelected ? [Colors('dedalBlue') , Colors('dedalBlueDisable')] : [Colors('dedalBlueDisable') , Colors('dedalBlue')])
    },[isSelected])

    const boxInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: outPutRange
    })
    const animatedStyle = {
        backgroundColor: boxInterpolation
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
    
    if (props.elem == null)
        return (
            <View style={[styles.card, styles.coming]}>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="clock" color={'#FFF'} size={30} />
                    <Text style={styles.text}>Incoming</Text>
                </View>
            </View>
        )
    return (
        <Animated.View
            onStartShouldSetResponder={
                () => (
                    handleAnimation(),
                    props.assertToContext(props.elem.id, !isSelected),
                    setIsSelected(!isSelected)
                )
            }
            style={[styles.card, animatedStyle]}
        >
            <View style={styles.row}>
                <MaterialCommunityIcons name="user" color={'#FFF'} size={30} />
                <Text style={styles.text}>{capitalizeFirstLetter(props.elem.name)}</Text>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '45%',
        borderRadius: 10,
        margin : 10,
        padding : 5
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
