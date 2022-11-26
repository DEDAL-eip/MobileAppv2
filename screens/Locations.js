import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function Location() {

  const test = (() => {
    return SafeAreaProvider.Log.token
  })


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des lieux</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>bonjour : {SafeAreaProvider.Log ? SafeAreaProvider.Log.Email : ""}</Text>
      <EditScreenInfo path="/screens/Home.tsx" />
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
