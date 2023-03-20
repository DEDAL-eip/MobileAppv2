import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { signIn } from "../../API/Login";

import { View, Text, Feather } from "../../constants/Themed";
import { global, textInput, color } from "../../style/styles";
import Colors from "../../constants/Colors";

import { TextButton } from "../../components/buttons/TextButton";
import { HideTextInput, TextInput } from "../../components/TextInput";

/**
 * @class display Login screen
 * @export
 * 
 * @description A function that returns a View to sign in or sign up.
 * @return {HTML} 
 */
export function LogInScreen({ navigation }) {
    const [Error, setError] = useState(false)
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    async function EasySignIn(email, password) {
        const res = await signIn(email, password)
        if (res.hasError == true)
          setError(true)
        else {
          SafeAreaProvider.Loged(true)
          SafeAreaProvider.Log = res
        }
      }

    return (
        <View style={global.container}>
            <Feather style={{margin: 10}} name={'arrow-left'} size={24} onPress={navigation.goBack}/>
            <View style={global.basicContainer}>
                <Text style={Error ? color.errorRed : null}>{Error ? "Wrong mail or password" : ""}</Text>
                <TextInput autoCapitalize='none' autoComplete='email' style={[textInput.global, { borderColor: Colors(Error ? 'ErrorRed' : 'dedalBlue') }]} title={'What\'s your email?'} onChangeText={setEmail} value={Email} />
                <HideTextInput autoCapitalize='none' autoComplete='password' style={[textInput.global, { borderColor: Colors(Error ? 'ErrorRed' : 'dedalBlue') }]} title={'What\'s your password?'} onChangeText={setPassword} value={Password} />
            </View>
            <View style={global.basicContainer}>
                <TextButton title="Log In" onPress={() => EasySignIn(Email, Password)} />
            </View>
        </View>
    )
}