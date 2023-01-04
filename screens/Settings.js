import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { useState } from "react";

import { global, color, table, textInput } from "../style/styles";
import { SendCode } from "../API/Settings";
import BasicModal from "../components/modal";
import { Title } from "../components/Title";
import { GlobalButton } from "../components/Button";
import { ModalLoginCode } from "../components/Modal/Login-Code";
import { TextInputGlobal } from "../components/TextInput";
import Colors from "../constants/Colors";
export default function Setting() {

  const [Open, setOpen] = useState(false)
  const [Error, setError] = useState(false)
  const [edit, setEdit] = useState(false)

  const log = ( async () => {
    const res = await SendCode(SafeAreaProvider.Log.Email)
    if (res.status == 204) {
        setOpen(true)
      }
      else 
        setError(true)
  })

  const buildDate = (date) => {
    let newDate = new Date(date)
    let final = newDate.getDay().toString() + '/'
    final += newDate.getMonth().toString()+ '/'
    final += newDate.getFullYear().toString()
    return (final)
  }

  const Username = () => {
    let res = !edit ?
      <Text>{SafeAreaProvider.Log.Username}</Text> :
      <TextInputGlobal style={[textInput.global, {backgroundColor: Colors('ErrorRed')}]} placeholder="Email" onChangeText={() => {console.log('here')}} value={'Email'}></TextInputGlobal>
    return res
  }

  return (
    <View style={global.container}>
      <Title title='Settings' ></Title>
      <View style={global.middleContainer}>
        <View style={table.row}>
          <View style={table.left}>
            <Text>UserName</Text>
            <Text>Email</Text>
            <Text>Last Connection</Text>
            <Text>Account Creation</Text>
          </View>
          <View style={table.right}>
            {Username()}
            <Text>{SafeAreaProvider.Log.Email}</Text>
            <Text>{buildDate(SafeAreaProvider.Log["Last connection"])}</Text>
            <Text>{buildDate(SafeAreaProvider.Log["createdAt"])}</Text>
          </View>
        </View>
      </View>
      <View style={[global.bottomContainer]}>
        <GlobalButton title="Modifier les Infos" onPress={() => log()}></GlobalButton>
        {
          !edit ?
          <GlobalButton title="Modifier le mot de passe" onPress={() => setEdit(true)}></GlobalButton> : 
          <GlobalButton title="Valider" onPress={() => setEdit(false)}></GlobalButton>
        }
        {Error == true ? <Text style={[global.textCenter, color.errorRed]}>Une erreur est subvenue</Text> : null}
      </View>
      <BasicModal Open={Open} setOpen={setOpen} Content={ModalLoginCode}>
      </BasicModal>
    </View>
  );
}
