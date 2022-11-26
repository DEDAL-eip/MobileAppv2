import { Button, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import { useState } from "react";

import { changePassword } from "../API/Settings";
import Colors from "../constants/Colors";
import BasicModal from "../components/modal";
import { hidden } from "../style/Hidden";
export default function Setting() {

  const [Open, setOpen] = useState(true)
  const [Error, setError] = useState(false)
  
  const log = ( async () => {
  const res = await changePassword(SafeAreaProvider.Log.Email)
  console.log(res.status)
  if (res.status == 204) {
      setOpen(true)
    }
    else 
      setError(true)
  })


  return (
    <View style={styles.container}>
      <Text style={styles.title}> Settings</Text>
      <View
        style={styles.separator}
        lightColor={Colors.light.text}
        darkColor={Colors.dark.text}
      />
      <Text>Username : {SafeAreaProvider.Log ? SafeAreaProvider.Log.Username : ""}</Text>
      <Text>Email : {SafeAreaProvider.Log ? SafeAreaProvider.Log.Email : ""}</Text>
      <Text visible={Error}>Bonjour : {Open ? 'oui' : "non"}</Text>

      <Button title="Modifier le mot de passe" onPress={() => log()}></Button>
      <Button title="Open Modal" onPress={() => setOpen(true)}></Button>
      <Text style={!Error ? "" : hidden.Hidden}>Error on fucntion</Text>
      <BasicModal Open={Open} setOpen={setOpen}></BasicModal>
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
