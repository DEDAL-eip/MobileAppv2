import { useState } from "react";
import {
    useColorScheme,
    TextInput as DefaultTextInput,
    View
} from "react-native";
import { Feather } from '../constants/Themed'
import Colors from "../constants/Colors";

export function TextInput(props) {
    const theme = useColorScheme();
    const { style, ...otherProps } = props;

    return (
        <DefaultTextInput
            style={[{ color: Colors('Text', theme) }, style]}
            placeholderTextColor={Colors('Text', theme)}
            selectionColor={Colors('Text', theme)}
            {...otherProps}
        />
    )
}


export function HideTextInput(props) {
    const [hide, setHide] = useState(true)

    return (
        <View style={{width : '100%', marginLeft: '10%', display : 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TextInput style={props.style} onChangeText={props.onChangeText} value={props.value} secureTextEntry={hide} placeholder={props.placeholder}></TextInput>
            <Feather style={{marginLeft : -40}} name={hide ? "eye" : "eye-off"} size={24} onPress={() => setHide(!hide)}/>
        </View>
    )
}