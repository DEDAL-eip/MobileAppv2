import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors, { palette } from '../constants/Colors'
import { text } from "../style/styles";

/**
 * @class
 * It's a custom Text component that loads fonts from the assets folder
 * @param props - {}
 * @returns A function that returns a component.
 * @category Component
 */
const LocationButton = (props) => {

    const color = props.selected == props.item.id ? palette.global.dedalBlueDisable : palette.global.dedalBlue

    return (
        <View>
            <TouchableOpacity style={[styles.card, {backgroundColor : color}]} onPress={() => props.Selector(props.item.id)}>
                <Text style={[text.small, {color: '#FFF'}]}>{props.item.name}</Text>
                <Text style={{color: Colors('dedalBlue') }}>{props.item.description}</Text>
            </TouchableOpacity>
        </View>
    )
}

const cardColor = '#00B4D8'
const styles = StyleSheet.create({
    card: {
        flex: 1,
        padding: 25,
        marginHorizontal: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: cardColor,
    }
})

export default LocationButton