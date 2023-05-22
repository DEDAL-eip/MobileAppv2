import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { palette } from '../constants/Colors'
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
                <Text style={styles.title}>{props.item.name}</Text>
                <Text style={styles.description}>{props.item.description}</Text>
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
    },
    title: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18
    },
    description: {
        color: '#FFF',
        fontSize: 12
    }
})

export default LocationButton