import { StyleSheet, Button, TextInput, Image } from "react-native";

import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Separator } from "../components/Separator";
import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";
import easyLog, { signIn, signUp } from "../API/Login";
import { hidden } from "../style/Hidden";
import { Title } from "../components/Title";
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
    <View style={styles.container}>
      <Title title='DEDAL' pict={require('../assets/logo.png')} subtitle='Le chemin de votre culture'></Title>
      <View style={styles.middleContainer}>
        <Text style={Error ? "" : hidden.Hidden}>{"Error Login"}</Text>
        <TextInput placeholder="Email"></TextInput>
        <TextInput placeholder="Passord"></TextInput>
        
        <Button color={Colors.light.dedalBlue} title=" |TMP| Ping API |TMP|" onPress={() => CallAPI()}></Button>
        <Button color={Colors.light.dedalBlue} title="Sign In" onPress={() => EasySignIn('eliot.martin@hotmail.fr', 'eliot123A&98')}></Button>
        <Button color={Colors.light.dedalBlue} title="Google" onPress={() => EasySignIn('eliot.martin@hotmail.fr', 'eliot123A&98')}></Button>
        <Button color={Colors.light.dedalBlue} title="Sign Up" onPress={() => EasySignIn('eliot.martin@hotmail.fr', 'eliot123A&98')}></Button>
        <Text>{Connect ? 'Connected' : 'Not Connected'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleContainer : {
    flex : 1,
    alignItems: "center",
    padding : '20%',
  },
  middleContainer : {
    flex : 2,
    width : '75%',

  },
  image:
  {
      alignSelf: 'center',
      width: 158,
      height: 158
  },
});
