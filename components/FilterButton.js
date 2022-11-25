import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/Feather'

/**
 * @class
 * It's a custom Text component that loads fonts from the assets folder
 * @param props - {}
 * @returns A function that returns a component.
 * @category Component
 */
const FilterButton = (props) => {
    const [isSelected, setIsSelected] = useState(true)

    if (props.text == null)
        return (
            <View style={[styles.card, styles.coming]}>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="clock" color={'#FFF'} size={30} />
                    <Text style={styles.text}>A VENIR</Text>
                </View>
            </View>
        )
    return (
        <View onStartShouldSetResponder={() => setIsSelected(!isSelected)} style={[styles.card, isSelected ? styles.selected : styles.unselected]}>
            <View style={styles.row}>
                <MaterialCommunityIcons name="user" color={'#FFF'} size={30} />
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </View>
    )
}

const cardColor = '#00B4D8'
const cardColorSelected = '#7B61FF'
const cardColorComing = '#C4C4C4'
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
    selected: {
        backgroundColor: cardColor,
    },
    unselected: {
        backgroundColor: cardColorSelected,
    },
    coming: {
        backgroundColor: cardColorComing,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default FilterButton