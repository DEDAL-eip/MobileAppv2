import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { signUp, signUpCode, signIn } from "../../API/Login";

import { View, Text, Feather } from "../../constants/Themed";
import { global, textInput } from "../../style/styles";
import Colors from "../../constants/Colors";

import { TextButton } from "../../components/buttons/TextButton";
import { TextInput } from "../../components/TextInput";

import '../../constants/languages/i18n';
import { useTranslation } from 'react-i18next';

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
    const { t, i18n } = useTranslation();

    const checkMailError = () => !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    const checkPasswordError = () => !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)

    const SendMail = async () => {
        setState(1)
        signUp(email, password).then(res => console.log(res))
    }

    const SendCode = async () => {
        let res = await signUpCode(email, code)
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
            <Feather style={{ margin: 10 }} name={'arrow-left'} size={24} onPress={navigation.goBack} />
            <View style={[global.basicContainer, { marginBottom: 20 }]}>
                <TextInput autoCapitalize='none' style={[textInput.global, { borderColor: Colors(checkMailError() ? 'ErrorRed' : 'dedalBlue') }]} title={"what's your email ?"} onChangeText={setEmail} value={email} />
                <TextInput autoCapitalize='none' style={[textInput.global, { borderColor: Colors(checkPasswordError() ? 'ErrorRed' : 'dedalBlue') }]} title={"what's your password?"} onChangeText={setPassword} value={password} />
                {!state ?
                    <View style={{ paddingTop: 20 }}>
                        <Text>{t('your password must contain at least') + ':'}</Text>
                        <Text>{"    - " + t('an upper and a lower case character')}</Text>
                        <Text>{"    - " + t('a number and a special character')}</Text>
                    </View>
                    :
                    <>
                        <TextInput autoCapitalize='none' style={textInput.global} placeholder="Code" onChangeText={setCode} value={code} />
                        <View style={{ paddingTop: 20 }}>
                            <Text>{error ? t('an error occured') : t('a verification code was sent to your email address')}</Text>
                        </View>
                    </>
                }

            </View>
            <View style={global.basicContainer}>
                {!state ?
                    <TextButton title={t('confirm')} onPress={() => SendMail()} disable={!(!checkMailError() && !checkPasswordError())} />
                    :
                    <TextButton title={t('confirm')} onPress={() => SendCode()} disable={code.length < 6} />
                }
            </View>
        </View>
    )
}