import { StyleSheet, Button } from "react-native";

import { Text, View } from "../components/Themed";
import easyLog from "../API/Login";
import { useState } from "react";

export default function Login() {
  const [Connect, setConnect] = useState(false)

  async function CallAPI() {
    const res = await easyLog()
    console.log(res)
    if (res == 200)
      setConnect(true)
    else 
      setConnect(false)
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
