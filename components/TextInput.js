import { useState } from "react";
import { useColorScheme, Text, TextInput as DefaultTextInput, View } from "react-native";

import { Feather } from '../constants/Themed'
import Colors from "../constants/Colors";

export function TextInput(props) {
    const theme = useColorScheme();
    const { style, ...otherProps } = props;

    return (
        <View style={{width : '100%', marginLeft: '10%', margin: 10}}>
            <Text style={[{ color: Colors('Text', theme), fontWeight: 'bold'}]}>{props.title}</Text>
            <DefaultTextInput
                style={[{ color: Colors('Text', theme) }, style]}
                placeholderTextColor={Colors('Text', theme)}
                selectionColor={Colors('Text', theme)}
                {...otherProps}
            />
        </View>
    )
}

export function HideTextInput(props) {
    const [hide, setHide] = useState(true)

    return (
        <View style={{width : '100%', marginLeft: '-10%', display : 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TextInput style={props.style} onChangeText={props.onChangeText} value={props.value} secureTextEntry={hide} placeholder={props.placeholder} title={props.title}></TextInput>
            <Feather style={{marginLeft : -85, marginTop: 25}} name={hide ? "eye" : "eye-off"} size={24} onPress={() => setHide(!hide)}/>
        </View>
    )
}