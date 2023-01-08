import { TextInput} from "react-native"
import { View } from "react-native"
import { Feather } from '@expo/vector-icons';
import { useState } from "react";

export const TextInputGlobal = (props => {
    return <TextInput style={props.style} onChangeText={props.onChangeText} value={props.value} placeholder={props.placeholder}></TextInput>
})


export const TextInputPassword = (props => {

    const [hide, setHide] = useState(true)

    return (
        <View style={{width : '100%', marginLeft: '50%', display : 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TextInput style={props.style} onChangeText={props.onChangeText} value={props.value} secureTextEntry={hide} placeholder={props.placeholder}></TextInput>
            <Feather style={{marginLeft : 10}}name={hide ? "eye" : "eye-off"} size={24} onPress={() => setHide(!hide)} color="black" />
        </View>
    )
})