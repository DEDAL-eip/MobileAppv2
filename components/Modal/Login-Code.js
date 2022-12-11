import { View } from "../Themed"
import { GlobalButton } from "../Button"
import { Title } from "../Title"
import { TextInput } from "react-native"
import { useEffect, useState } from "react"
import { Text } from "../Themed"
import { global, textInput } from "../../style/styles"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { changePassword } from "../../API/Settings"

export const ModalLoginCode = () => {
    const [Error, setError] = useState(false)
    const [Disable, setDisable] = useState(true)
    const [Code, setCode] = useState("")
    const [Password, setPassword] = useState("")
    const [ValidatePassword, setValidatePassword] = useState("")

    const Validate = async () => {
        console.log(Code, Password)
        let res = await changePassword(SafeAreaProvider.Log.Email, Password, Code)
        if (res.status == 202)
            console.log('succes', Password)
        else
            setError(true)
    }

    useEffect(() => {
    }, [Password])

    return (
        <>
            <View style={global.titleContainer}>
                <Title 
                    title={'Changement de mot de passe'}
                    subtitle={'Un code a était envoye sur votre adresse mail  : \n' + SafeAreaProvider.Log.Email}/>
            </View>
        
            <View style={global.middleContainer}>
                <TextInput
                    style={textInput.global}
                    onChangeText={setCode}
                    value={Code}
                    placeholder="Code"
                    keyboardType="numeric"
                />
                <TextInput
                    style={textInput.global}
                    onChangeText={setPassword}
                    value={Password}
                    placeholder="Password"
                />
                <TextInput
                    style={textInput.global}
                    onChangeText={setValidatePassword}
                    value={ValidatePassword}
                    placeholder="Validate Password"
                />
          <TextInput autoCapitalize='none' autoComplete='email' style={textInput.global} placeholder="Email"></TextInput>

                {Error == true ? <Text style={global.textCenter} Type={'ErrorRed'}>Une erreur est subvenue</Text> : null}
          </View>
          <View style={global.bottomContainer}>
                <GlobalButton
                    disable={Disable}
                    title='Validate'
                    onPress={Validate}
                >
              </GlobalButton>
          </View>
          </>
    )
}