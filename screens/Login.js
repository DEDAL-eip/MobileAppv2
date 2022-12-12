import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Title } from "../components/Title";
import { LoginTextInput } from "../components/TextInput";
import { GlobalButton } from "../components/Button";
import { Text, View } from "../components/Themed";

import easyLog, { signIn, signUp } from "../API/Login";

import { hidden } from "../style/Hidden";
import { global } from "../style/styles";

export default function Login() {
  const [Connect, setConnect] = useState(false)
  const [Error, setError] = useState(false)
  async function CallAPI() {
    const res = await easyLog()
    console.log(res)
    if (res == 200) {
      setConnect(true)
    }
    else 
      setConnect(false)
  }

  async function EasySignIn(email, password) {
    const res = await signIn(email, password)
    console.log(res)
    if (res.hasError == true)
      setError(true)
    else {
      SafeAreaProvider.Loged(true)
      SafeAreaProvider.Log = res
    }
  }

  return (
    <View style={global.container}>
      <Title title='DEDAL' pict={require('../assets/logo.png')} subtitle='Le chemin de votre culture'></Title>
      <View style={global.middleContainer}>
        <Text style={Error ? "" : hidden.Hidden}>{"Error Login"}</Text>

        <LoginTextInput placeholder="Email" />
        <LoginTextInput placeholder="Passord" />
        
        <GlobalButton title=" |TMP| Ping API |TMP|" onPress={() => CallAPI()} />
        <GlobalButton title="Sign In" onPress={() => EasySignIn('eliot.martin@hotmail.fr', 'tmpTEST123@')} />
        <GlobalButton title="Google" onPress={() => EasySignIn('eliot.martin@hotmail.fr', 'eliot123A&98')} />
        <GlobalButton title="Sign Up" onPress={() => EasySignIn('eliot.martin@hotmail.fr', 'eliot123A&98')} />

        <Text>{Connect ? 'Connected' : 'Not Connected'}</Text>
      </View>
    </View>
  );
}