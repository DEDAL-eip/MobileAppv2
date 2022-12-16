import { TextInput } from "react-native";
import { GlobalButton } from "../components/Button";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import easyLog, { signIn, signUp } from "../API/Login";
import { global, textInput } from "../style/styles";
import { Title } from "../components/Title";
import Colors from "../constants/Colors"
import { Separator } from "../components/Separator";
import { TextInputPassword, TextInputGlobal } from "../components/TextInput";

export default function Login() {
  const [Error, setError] = useState(false)
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  async function CallAPI() {
    const res = await easyLog()
    console.log(res)
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

  return (
    <View style={global.container}>
      <View style={{width : 10, height: 10, alignSelf: 'flex-end', borderRadius: 100, marginRight: 10, marginTop: 10, backgroundColor : CallAPI() ? Colors.light.ValidateGreen : Colors.light.ErrorRed, }}>

      </View>
      <View style={global.titleContainer}>
        <Title title='DEDAL' pict={require('../assets/logo.png')} subtitle='Le chemin de votre culture'></Title>
      </View>
      <View style={global.middleContainer}>
        <Text Type='ErrorRed'>{Error ? "Error Login" : ""}</Text>
        <TextInputGlobal autoCapitalize='none' autoComplete='email' style={textInput.global} placeholder="Email" onChangeText={setEmail} value={Email}></TextInputGlobal>
        <TextInputPassword autoCapitalize='none' autoComplete='password' style={textInput.global} placeholder="Passord" onChangeText={setPassword} value={Password}></TextInputPassword>
        <GlobalButton title="Sign In" onPress={() => EasySignIn(Email, Password)}></GlobalButton>
        <View style={{width: '25%',}}>
          <Separator />
        </View>
          <GlobalButton title="Sign Up" onPress={() => EasySignIn('eliot.martin@hotmail.fr', 'pasWORD1@')}></GlobalButton>
          <GlobalButton title="Google" onPress={() => EasySignIn('eliot.martin@hotmail.fr', 'pasWORD1@')}></GlobalButton>
      </View>
    </View>
  );
}