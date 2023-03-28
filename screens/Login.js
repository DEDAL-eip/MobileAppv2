import { GlobalButton } from "../components/Button";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, Text } from "../constants/Themed";
import { signIn, google, nextG } from "../API/Login";
import { color, global, textInput } from "../style/styles";
import { HomeTitle } from "../components/Title";
import Colors from "../constants/Colors"
import { Separator } from "../constants/Themed";
import { TextInputPassword, TextInputGlobal } from "../components/TextInput";
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { useEffect } from "react";
import SignUp from "../components/SignUp";
import * as SecureStore from 'expo-secure-store';
import Checkbox from 'expo-checkbox';
import { TouchableOpacity } from "react-native-gesture-handler";
import BasicModal from "../components/modal";
import { ModalLoginCode } from "../components/Modal/Login-Code";
import { AskEmailModal } from "../components/Modal/AskEmail";


async function save(email, password, check) {
  await SecureStore.setItemAsync('log', JSON.stringify({ email: email, password: password, check: check }));
}

async function remove() {
  await SecureStore.deleteItemAsync('log')
}

async function getValueFor() {
  let result = await SecureStore.getItemAsync('log');
  return JSON.parse(result)
}

/**
 * @class display Login screen
 * @export
 * 
 * @description A function that returns a View to sign in or sign up.
 * @return {HTML} 
 */
export default function Login() {
  const [Error, setError] = useState(false)
  const [Step, setStep] = useState(0)
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [isChecked, setChecked] = useState(false)
  const [isOpen, setOpen] = useState(false)

  const url = Linking.useURL()

  async function EasySignIn(email, password) {
    if (isChecked)
      save(Email, Password, isChecked)
    else 
      remove()
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

  useEffect(() => {
    const loadFromStore = async () => {
      const res = await getValueFor()
      if (res) {
        setPassword(res.password)
        setEmail(res.email)
        setChecked(true)
      }
    }
    loadFromStore()
  }, [])

  return (
    <View style={global.container}>
      <View style={global.titleContainer}>
        <HomeTitle title='DEDAL' pict={require('../assets/logo.png')} subtitle='Le chemin de votre culture' />
      </View>
      <View style={global.middleContainer}>
        {Step === 0 ?
          <>
            <View style={[global.basicContainer, { paddingBottom: 20 }]}>
              <Text style={Error ? color.errorRed : null}>{Error ? "Email ou mot de passe incorrecte" : ""}</Text>
              <TextInputGlobal autoCapitalize='none' autoComplete='email' style={[textInput.global, { borderColor: Colors(Error ? 'ErrorRed' : 'dedalBlue') }]} placeholder="Email" onChangeText={setEmail} value={Email}></TextInputGlobal>
              <TextInputPassword autoCapitalize='none' autoComplete='password' style={[textInput.global, { borderColor: Colors(Error ? 'ErrorRed' : 'dedalBlue') }]} placeholder="Password" onChangeText={setPassword} value={Password}></TextInputPassword>
              <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10}}>
                <Checkbox value={isChecked} onValueChange={() => setChecked(!isChecked)}/>
                <Text>  Se souvenir de moi</Text>
              </View>
            </View>

            <GlobalButton title="Sign In" onPress={() => EasySignIn(Email, Password)}></GlobalButton>
            <GlobalButton title="Sign Up" onPress={() => setStep(1)} />
            <View style={{ width: '25%', paddingBottom: 20, paddingTop: 20 }}>
              <Separator />
            </View>
            <GlobalButton title="Google" onPress={() => createGoogleAccount()}></GlobalButton>
              <Text style={{marginTop: 15, fontSize: 14}} onPress={() => setOpen(true)} >Mot de passe oublié</Text>
          </>
          : <SignUp oldEmail={Email} oldPassword={Password} setBack={() => setStep(0)} />
        }
      <BasicModal Open={isOpen} setOpen={setOpen} Content={AskEmailModal}/>
      </View>
    </View>
  );
}
