import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";

import { global, color, table, textInput } from "../style/styles";
import { MypatchParams, SendCode } from "../API/Settings";
import BasicModal from "../components/modal";
import { Title } from "../components/Title";
import { GlobalButton } from "../components/Button";
import { ModalLoginCode } from "../components/Modal/Login-Code";
import { TextInputGlobal } from "../components/TextInput";

export default function Setting() {

  const [Open, setOpen] = useState(false)
  const [Error, setError] = useState(false)
  const [edit, setEdit] = useState(false)
  const [userName, setUsername] = useState(SafeAreaProvider.Log.Username)

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

  const modif = async () => {
    console.log('here')
    if (userName.length != 0)
      await MypatchParams(SafeAreaProvider.Log["id"], {'username' : userName}, SafeAreaProvider.Log.token).then(res => console.log('res => ', res))
    setEdit(false)
    }

  return (
    <View style={global.container}>
      <Title title='Settings' ></Title>
      <View style={global.middleContainer}>

      <View style={[table.row, {marginBottom : 10}]}>
          <View style={table.col}>
            <Text>UserName</Text>
          </View>
          <View style={table.col}>
          {!edit ?
              <Text>{SafeAreaProvider.Log.Username}</Text> :
              <TextInputGlobal style={[userName.length == 0 ? textInput.Error : textInput.global, {width: '100%'}]} placeholder="UserName" onChangeText={setUsername} value={userName}></TextInputGlobal>
          }
          </View>
      </View>
        <View style={table.row}>
          <View style={table.col}>
            <Text>Email</Text>
            <Text>Last Connection</Text>
            <Text>Account Creation</Text>
            <Text>ID</Text>
          </View>
          <View style={table.col}>
            <Text>{SafeAreaProvider.Log.Email}</Text>
            <Text>{buildDate(SafeAreaProvider.Log["Last connection"])}</Text>
            <Text>{buildDate(SafeAreaProvider.Log["createdAt"])}</Text>
            <Text>{SafeAreaProvider.Log["id"]}</Text>
          </View>
        </View>
      </View>
      <View style={[global.bottomContainer]}>
        {
          !edit ?
          <GlobalButton title="Modifier les infos" onPress={() => setEdit(true)}></GlobalButton> : 
          <GlobalButton title={userName.length == 0 ? "Annuler" : "Valider"} onPress={() => modif()}></GlobalButton>
        }
        {Error == true ? <Text style={[global.textCenter, color.errorRed]}>Une erreur est subvenue</Text> : null}
        <GlobalButton title="Modifier le mot de passe" onPress={() => log()}></GlobalButton>
      </View>
      <BasicModal Open={Open} setOpen={setOpen} Content={ModalLoginCode}>
      </BasicModal>
    </View>
  );
}
