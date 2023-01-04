import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/Feather'
import { SafeAreaProvider } from "react-native-safe-area-context"

/**
 * @class
 * @param props - {}
 * @returns A function that returns a View clickable with a state, an icon and a text.
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
        <View
            onStartShouldSetResponder={
                () => (
                    props.assertToContext(props.text, isSelected),
                    setIsSelected(!isSelected)
                )
            }
            style={[styles.card, isSelected ? styles.selected : styles.unselected]}
        >
            <View style={styles.row}>
                <MaterialCommunityIcons name="user" color={'#FFF'} size={30} />
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </View>
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
    selected: {
        backgroundColor: '#00B4D8'
    },
    unselected: {
        backgroundColor: '#7B61FF',
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