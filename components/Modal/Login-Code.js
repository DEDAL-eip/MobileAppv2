import { View } from "../Themed"
import { GlobalButton } from "../Button"
import { Title } from "../Title"
import { StyleSheet, TextInput } from "react-native"
import { useEffect, useState } from "react"
import { Text } from "../Themed"
import { modal, global } from "../../style/styles"
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
        <View style={modal.container}>
            <View style={modal.titleContainer}>
                <Title 
                title='Code de verification'
                subtitle={'Un code a était envoye sur votre adresse mail : ' + SafeAreaProvider.Log.Email}/>
            </View>
            <View style={modal.middleContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setCode}
                    value={Code}
                    placeholder="Code"
                    keyboardType="numeric"

                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={Password}
                    placeholder="Password"

                />
                <TextInput
                    style={styles.input}
                    onChangeText={setValidatePassword}
                    value={ValidatePassword}
                    placeholder="Validate Password"

                />
                {Error == true ? <Text style={global.textCenter} Type={'ErrorRed'}>Une erreur est subvenue</Text> : null}
          </View>
          <View style={modal.bottomContainer}>
                <GlobalButton
                disable={Disable}
                title='Validate'
                onPress={Validate}
                >
              </GlobalButton>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input : {
        borderWidth: 1,
        padding: 10,
    }
})