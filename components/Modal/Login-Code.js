import { View } from "react-native"
import { TextButton } from "../buttons/TextButton"
import { TextInputGlobal, TextInputPassword } from "../../components/TextInput"
import { useEffect, useState } from "react"
import { Text } from "../../constants/Themed";
import { global, textInput } from "../../style/styles"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { changePassword } from "../../API/Settings"

export const ModalLoginCode = () => {
    const [Error, setError] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState(false)
    const [ErrorPas, setErrorPas] = useState(false)
    const [Disable, setDisable] = useState(true)
    const [Code, setCode] = useState("")
    const [Password, setPassword] = useState("")
    const [ValidatePassword, setValidatePassword] = useState("")

    const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    
    const Validate = async () => {
        let res = await changePassword(SafeAreaProvider.Log.Email, Password, Code)
        if (res.status != 202)
            setErrorMsg(true)
    }

    useEffect(() => {
        if (!Password.match(passwordReg))
            setError(true)
        else
            setError(false)
    }, [Password])

    useEffect(() => {
        if (Password != ValidatePassword)
            setErrorPas(true)
        else
            setErrorPas(false)
    }, [ValidatePassword, Password])

    useEffect(() => {
        if (!ErrorPas && Code.length == 6 && !Error)
            setDisable(false)
        else
            setDisable(true)
    }, [ErrorPas, Error, Code])

    return (
        <>
            <View style={global.titleContainer}>
                <Text>{'Changement de mot de passe'}</Text> 
                <Text>{'Un code a était envoye sur votre adresse mail  : \n' + SafeAreaProvider.Log.Email}</Text>
            </View>
        
            <View style={global.middleContainer}>
                <TextInputGlobal
                    style={Code.length != 6 ? textInput.Error : textInput.global}
                    onChangeText={setCode}
                    value={Code}
                    placeholder="Code"
                    keyboardType="numeric"
                />
                <TextInputPassword
                    style={Error ? textInput.Error : textInput.global}
                    onChangeText={setPassword}
                    value={Password}
                    placeholder="Password"
                />
                <TextInputPassword
                    style={ErrorPas ? textInput.Error : textInput.global}
                    onChangeText={setValidatePassword}
                    value={ValidatePassword}
                    placeholder="Validate Password"
                />

                {ErrorMsg == true ? <Text style={[global.textCenter, color.ErrorRed]}>Le code n'est pas valide</Text> : null}
          </View>
          <View style={global.bottomContainer}>
                <TextButton
                    disable={Disable}
                    title='Validate'
                    onPress={Validate}
                >
              </TextButton>
          </View>
          </>
    )
}