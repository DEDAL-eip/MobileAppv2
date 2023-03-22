import { View } from "react-native"
import { GlobalButton } from "../Button"
import { Title } from "../Title"
import { TextInputGlobal, TextInputPassword } from "../../components/TextInput"
import { useEffect, useState } from "react"
import { Text } from "../../constants/Themed";
import { global, textInput } from "../../style/styles"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { changePassword, SendCode } from "../../API/Settings"

export const AskEmailModal = () => {
    const [Error, setError] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState(false)
    const [ErrorPas, setErrorPas] = useState(false)
    const [email, setEmail] = useState('')
    const [Disable, setDisable] = useState(true)
    const [Code, setCode] = useState("")
    const [Password, setPassword] = useState("")
    const [ValidatePassword, setValidatePassword] = useState("")
    const [step, setStep] = useState(0)

    const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    const emailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    const Validate = async () => {
        if (step == 0) {
            const res = await SendCode(email)
            if (res.status == 204) {
                setStep(1)
                setDisable(true)
            }
        }
        if (step == 1) {
            let res = await changePassword(email, Password, Code)
            console.log(res)
            if (res.status != 202)
                setErrorMsg(true)

        }
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

    useEffect(() => {
        if (email.match(emailReg))
            setDisable(false)
        else
            setDisable(true)

    }, [email])
    return (
        <>
            <View style={global.titleContainer}>
                <Title title={'Changement de mot de passe'}
                    subtitle={!step ? '' : 'Un code a était envoye sur votre adresse mail  : \n' + email} />

            </View>

            <View style={global.middleContainer}>
                {
                    step == 0 ?
                        <TextInputGlobal
                            style={textInput.global}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Email"
                        /> :
                        <>
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

                            {ErrorMsg == true ? <Text style={global.textCenter}>Le code n'est pas valide</Text> : null}
                        </>
                }

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