import { GlobalButton } from "../components/Button";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import easyLog, { signIn, signUp, google, nextG } from "../API/Login";
import { color, global, textInput } from "../style/styles";
import { HomeTitle } from "../components/Title";
import Colors from "../constants/Colors"
import { Separator } from "../components/Separator";
import { TextInputPassword, TextInputGlobal } from "../components/TextInput";
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { useEffect } from "react";

export default function Login() {
  const [Error, setError] = useState(false)
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [first, setfirst] = useState("wait")
  const [second, setsecond] = useState("wait")
  const url = Linking.useURL()

  async function CallAPI() {
    const res = await easyLog()
    if (res == 200) {
      return true
    }
    else 
      return false
  }
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
    let callbackUrl  = Linking.createURL()
    console.log(callbackUrl)
    await WebBrowser.openBrowserAsync(`https://dedal.auth.eu-west-1.amazoncognito.com/login?client_id=cse59djt26m2kikuacurl26uj&response_type=code&scope=email+openid+profile&redirect_uri=${callbackUrl}`)
}

  const logInGoogleAccount = async (code) => {
    let callbackUrl  = Linking.createURL()
    let res = await google(code, callbackUrl)
    if(res.error)
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
    const {queryParams} = Linking.parse(url);
    if (queryParams.code)
      logInGoogleAccount(queryParams.code)
  }
}, [url])

  return (
    <View style={global.container}>
      <View style={{width : 10, height: 10, alignSelf: 'flex-end', borderRadius: 100, marginRight: 10, marginTop: 10, backgroundColor : CallAPI() ? Colors('ValidateGreen') : Colors('ErrorRed'), }}>
      </View>
      <View style={global.titleContainer}>
        <HomeTitle title='DEDAL' pict={require('../assets/logo.png')} subtitle='Le chemin de votre culture'/>
      </View>
      <View style={global.middleContainer}>
        <View style={[global.basicContainer, {paddingBottom:20}]}>
          <Text style={color.errorRed}>{Error ? "Email ou mot de passe incorrecte" : ""}</Text>
          <TextInputGlobal autoCapitalize='none' autoComplete='email' style={[textInput.global, {borderColor: Colors(Error ? 'ErrorRed' : 'dedalBlue')}]} placeholder="Email" onChangeText={setEmail} value={Email}></TextInputGlobal>
          <TextInputPassword autoCapitalize='none' autoComplete='password' style={[textInput.global, {borderColor: Colors(Error ? 'ErrorRed' : 'dedalBlue')}]} placeholder="Password" onChangeText={setPassword} value={Password}></TextInputPassword>
        </View>
          <GlobalButton title="Sign In" onPress={() => EasySignIn(Email, Password)}></GlobalButton>
          <View style={{width: '25%',paddingBottom:20, paddingTop:60}}>
            <Separator />
          </View>
            <GlobalButton title="Sign Up" onPress={() => EasySignIn('eliot.martin@hotmail.fr', 'pasWORD1@')}></GlobalButton>
            <GlobalButton title="Google" onPress={() => createGoogleAccount()}></GlobalButton>
      </View>
    </View>
  );
}