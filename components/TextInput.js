import { useState } from "react";
import { useColorScheme, TextInput as DefaultTextInput, View } from "react-native";

import { Text, Feather } from '../constants/Themed'
import Colors from "../constants/Colors";
import { text } from "../style/styles";

export const TextInput = (({
    title,
    editable = true,
    onChangeText,
    value,
    placeholder,
    style,
    autoComplete,
    secureTextEntry
}) => {
    const theme = useColorScheme();

    return (
        <View style={{width : '100%', marginLeft: '10%', margin: 10}}>
            <Text style={[text.small]}>{title}</Text>             
            <DefaultTextInput
                autoComplete={autoComplete}
                style={[{ color: Colors('Text', theme), backgroundColor: editable ? 'transparent' : Colors('dedalBlueDisable') }, style]}
                placeholderTextColor={Colors('Text', theme)}
                selectionColor={Colors('Text', theme)}
                editable={editable}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
})

export const HideTextInput = (({
    title,
    editable = true,
    onChangeText,
    value,
    placeholder,
    style,
    autoComplete
}) => {
    const [hide, setHide] = useState(true)

    return (
        <View style={{width : '100%', marginLeft: '-10%', display : 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TextInput autoComplete={autoComplete} style={style} editable={editable} onChangeText={onChangeText} value={value} secureTextEntry={hide} placeholder={placeholder} title={title} />
            <Feather style={{marginLeft : -85, marginTop: 25}} name={hide ? "eye" : "eye-off"} size={24} onPress={() => setHide(!hide)}/>
        </View>
    )
})