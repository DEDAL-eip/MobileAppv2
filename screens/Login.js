import { StyleSheet, Button } from "react-native";

import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";
import easyLog, { signIn, signUp } from "../API/Login";
import { hidden } from "../style/Hidden";

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
      <Text lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.title}>Login</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={Error ? "" : hidden.Hidden}>{"Error Login"}</Text>
      <Button title="Ping API" onPress={() => CallAPI()}></Button>
      <Button title="SignUp" onPress={() => EasySignIn('eliot.martin@hotmail.fr', 'eliot123A&98')}></Button>
      <Text>{Connect ? 'Connected' : 'Not Connected'}</Text>
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
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
