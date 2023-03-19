import { createStackNavigator } from '@react-navigation/stack';
import { TextButton } from "../../components/buttons/TextButton";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, Text } from "../../constants/Themed";
import { signIn, google, nextG } from "../../API/Login";
import { color, global, textInput } from "../../style/styles";
import { HomeTitle } from "../../components/Title";
import Colors from "../../constants/Colors"
import { Separator } from "../../constants/Themed";
import { TextInputPassword, TextInputGlobal } from "../../components/TextInput";
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { useEffect } from "react";
import SignUpScreen from "./SignUpScreen";

/**
 * @class display Login screen
 * @export
 * 
 * @description A function that returns a View to sign in or sign up.
 * @return {HTML} 
 */
export function ConnectionsScreen({ navigation }) {
  const [Error, setError] = useState(false)
  const [Step, setStep] = useState(0)
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const url = Linking.useURL()

  async function EasySignIn(email, password) {
    const res = await signIn(email, password)
    if (res.hasError == true)
      setError(true)
    else {
      SafeAreaProvider.Loged(true)
      SafeAreaProvider.Log = res
    }
  }

  const createGoogleAccount = async () => {
    let callbackUrl = Linking.createURL()
    await WebBrowser.openBrowserAsync(`https://dedal.auth.eu-west-1.amazoncognito.com/login?client_id=cse59djt26m2kikuacurl26uj&response_type=code&scope=email+openid+profile&redirect_uri=${callbackUrl}`)
  }

  const logInGoogleAccount = async (code) => {
    let callbackUrl = Linking.createURL()
    let res = await google(code, callbackUrl)
    if (res.error)
      setError(true)
    else
      nextGoogle(res)
  }

  const nextGoogle = async (res) => {
    let result = await nextG(res)
    if (result.error)
      setError(true)
    else {
      SafeAreaProvider.Loged(true)
      SafeAreaProvider.Log = result
    }
  }

  useEffect(() => {
    if (url) {
      const { queryParams } = Linking.parse(url);
      if (queryParams.code)
        logInGoogleAccount(queryParams.code)
    }
  }, [url])

  return (
    <View style={global.container}>
      <View style={global.titleContainer}>
        <HomeTitle title='DEDAL' pict={require('../../assets/logo.png')} subtitle='The path to your culture' />
      </View>
      <View style={global.middleContainer}>
        <View style={[global.basicContainer, { paddingBottom: 20 }]}>
          <Text style={Error ? color.errorRed : null}>{Error ? "Wrong mail or password" : ""}</Text>
          <TextInputGlobal autoCapitalize='none' autoComplete='email' style={[textInput.global, { borderColor: Colors(Error ? 'ErrorRed' : 'dedalBlue') }]} placeholder="Email" onChangeText={setEmail} value={Email}></TextInputGlobal>
          <TextInputPassword autoCapitalize='none' autoComplete='password' style={[textInput.global, { borderColor: Colors(Error ? 'ErrorRed' : 'dedalBlue') }]} placeholder="Password" onChangeText={setPassword} value={Password}></TextInputPassword>
        </View>

        <TextButton title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
        <TextButton title="Google" onPress={() => createGoogleAccount()} />
        <View style={{ width: '25%', paddingBottom: 20, paddingTop: 20 }}>
          <Separator />
        </View>
        <TextButton title="Log In" onPress={() => EasySignIn(Email, Password)} />
      </View>
    </View>
  );
}