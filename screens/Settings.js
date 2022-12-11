import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import { useState } from "react";

import { global } from "../style/styles";
import { SendCode } from "../API/Settings";
import BasicModal from "../components/modal";
import { Title } from "../components/Title";
import { GlobalButton } from "../components/Button";
import { ModalLoginCode } from "../components/Modal/Login-Code";

export default function Setting() {

  const [Open, setOpen] = useState(false)
  const [Error, setError] = useState(false)
  
  const log = ( async () => {
    const res = await SendCode(SafeAreaProvider.Log.Email)
    console.log(res.status)
    if (res.status == 204) {
        setOpen(true)
      }
      else 
        setError(true)
  })

  return (
    <View style={global.container}>
      <Title title='Settings' subtitle={SafeAreaProvider.Log.Username}></Title>
      <View style={global.middleContainer}>
        <Text style={global.textCenter}>Email : {SafeAreaProvider.Log.Email}</Text>
        <Text style={global.textCenter}>Last Connection : {SafeAreaProvider.Log["Last connection"]}</Text>
        <Text style={global.textCenter}>Acount creation : {SafeAreaProvider.Log["createdAt"]}</Text>
      </View>
      <View style={global.bottomContainer}>
      <GlobalButton title="Modifier le mot de passe" onPress={() => log()}></GlobalButton>
        {Error == true ? <Text style={global.textCenter} Type={'ErrorRed'}>Une erreur est subvenue</Text> : null}

      </View>
      <BasicModal Open={Open} setOpen={setOpen} Content={ModalLoginCode}>
      </BasicModal>
    </View>
  );
}