import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { signUp, signUpCode, signIn } from "../../API/Login";

import { View, Text } from "../../constants/Themed";
import { global, textInput } from "../../style/styles";
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
export function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState("")
    const [state, setState] = useState(0)
    const [error, setError] = useState(false)

    const checkMailError = () => !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    const checkPasswordError = () => !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)

    const SendMail = async () => {
        setState(1)
        signUp(email, password).then(res => console.log(res))
    }

    const SendCode = async () => {
        let res = await signUpCode(email, code)
        console.log(email, password, res)
        if (res == 201)
            signIn(email, password).then(res => {
                if (res.hasError == true)
                    setError(true)
                else {
                    SafeAreaProvider.Loged(true)
                    SafeAreaProvider.Log = res
                }
            })
        else
            setError(true)
    }

    return (
        <View style={global.container}>
            <View style={global.middleContainer}>
                <TextInput autoCapitalize='none' style={[textInput.global, { borderColor: Colors(checkMailError() ? 'ErrorRed' : 'dedalBlue') }]} placeholder='Email' onChangeText={setEmail} value={email} />
                <HideTextInput autoCapitalize='none' style={[textInput.global, { borderColor: Colors(checkPasswordError() ? 'ErrorRed' : 'dedalBlue') }]} placeholder="password" onChangeText={setPassword} value={password} />
                {!state ?
                    <View style={{ paddingTop: 20 }}>
                        <Text>Votre mot de passe doit contenir au moins : </Text>
                        <Text>  - Une majuscule & une minuscule</Text>
                        <Text>  - Un nombre & un caractère spécial</Text>
                    </View>
                    :
                    <>
                        <TextInput autoCapitalize='none' style={textInput.global} placeholder="Code" onChangeText={setCode} value={code} />
                        <View style={{ paddingTop: 20 }}>
                            <Text>{error ? "une erreur est subvenu veillez réésailler" : "Un code de verification vous à était envoyé sur voter adresse mail."}</Text>
                        </View>
                    </>
                }

            </View>
            <View style={global.bottomContainer}>
                {!state ?
                    <TextButton title="Valider" onPress={() => SendMail()} disable={!(!checkMailError() && !checkPasswordError())} />
                    :
                    <TextButton title="Valider" onPress={() => SendCode()} disable={code.length < 6} />
                }
                <TextButton title="Retour" onPress={navigation.goBack}></TextButton>
            </View>
        </View>
    )
}