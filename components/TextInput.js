import { useState } from "react";
import { useColorScheme, TextInput as DefaultTextInput, View } from "react-native";

import { Text, Feather } from '../constants/Themed'
import Colors from "../constants/Colors";
import { text } from "../style/styles";

export const TextInput = (({
    title,
    editable = true,
    secret = false,
    onChangeText,
    value,
    placeholder,
    style,
    autoComplete,
}) => {
    const theme = useColorScheme();
    const [hide, setHide] = useState(true)

    return (
        <View style={{ marginTop: 10 }}>
            <Text style={[text.small]}>{title}</Text>
            <View style={{ flexDirection: 'row'}}>
                <DefaultTextInput
                    autoComplete={autoComplete}
                    style={[{ color: Colors('Text', theme), backgroundColor: editable ? 'transparent' : Colors('dedalBlueDisable') }, style]}
                    placeholderTextColor={Colors('Text', theme)}
                    selectionColor={Colors('Text', theme)}
                    editable={editable}
                    onChangeText={onChangeText}
                    value={value}
                    placeholder={placeholder}
                    secureTextEntry={secret}
                />
                {secret ?
                    <Feather style={{marginLeft : -40, marginTop: 17.5}} name={hide ? "eye" : "eye-off"} size={24} onPress={() => setHide(!hide)}/>
                    :
                    <></>
                }
            </View>         
        </View>
    )
})