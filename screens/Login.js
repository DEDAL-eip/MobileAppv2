import { StyleSheet, Button } from "react-native";

import { Text, View } from "../components/Themed";
import easyLog, { signIn, signUp } from "../API/Login";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Login() {
  const [Connect, setConnect] = useState(false)
  const [UserInfo, setInfo] = useState({})
  async function CallAPI() {
    const res = await easyLog()
    console.log(res)
    if (res == 200)
      setConnect(true)
    else 
      setConnect(false)
  }

  async function EasySignIn() {
    const res = await signIn('eliot.martin@hotmail.fr', 'eliot123A&98')
    setInfo(res)
    SafeAreaProvider.Log = res
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button title="Ping API" onPress={() => CallAPI()}></Button>
      <Button title="SignUp" onPress={() => EasySignIn('eliot.martin@hotmail.fr', 'eliot123A&98')}></Button>
      <Text>{Connect ? 'Connected' : 'Not Connected'}</Text>
      <Text>{UserInfo.Email}</Text>
      <Text>{UserInfo.id}</Text>
      <Text>{UserInfo.token}</Text>
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
