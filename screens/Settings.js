import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View, Switch } from "react-native";
import { useState } from "react";

import { global, color, table, textInput } from "../style/styles";
import { MypatchParams, SendCode } from "../API/Settings";
import BasicModal from "../components/modal";
import { Title } from "../components/Title";
import { GlobalButton } from "../components/Button";
import { ModalLoginCode } from "../components/Modal/Login-Code";
import { TextInputGlobal } from "../components/TextInput";
import Colors from "../constants/Colors";


/**
 * @class display Home screen
 * 
 * @description Display user settings & edit button
 * @return {HTML} 
 */
export default function Setting() {

  const [Open, setOpen] = useState(false)
  const [Error, setError] = useState(false)
  const [Edit, setEdit] = useState(false)
  const [Username, setUsername] = useState(SafeAreaProvider.Log.Username)
  const [mode, setMode] = useState(SafeAreaProvider.mode=='dark' ? true : false)
  /**
   * Call API to send verification code 
   * And open CHange password modal
   */
  const SendVerifCode = ( async () => {
    const res = await SendCode(SafeAreaProvider.Log.Email)
    if (res.status == 204) {
        setOpen(true)
      }
      else 
        setError(true)
  })


  /**
   * @param {date} date  
   * @returns {string} date in format "DD/MM/YYYY" 
   */
  const buildDate = (date) => {
    let newDate = new Date(date)
    let final = newDate.getDay().toString() + '/'
    final += newDate.getMonth().toString()+ '/'
    final += newDate.getFullYear().toString()
    return (final)
  }


  /**
   * Call API to change the usersettings
   * Set Edit to false
   */
  const validateChange = async () => {
    if (Username.length != 0)
      await MypatchParams(SafeAreaProvider.Log["id"], {'username' : Username}, SafeAreaProvider.Log.token).then(res => console.log('res => ', res))
    setEdit(false)
    }

    const updateSwitch = (e) => {
      setMode(e)
      console.log('switch => ', e)
      if (e)
        SafeAreaProvider.mode =('dark')
      else 
        SafeAreaProvider.mode = ('light')
    }


  return (
    <View style={global.container}>
      <Title title='Settings' ></Title>
      <View style={global.middleContainer}>
        <View style={[table.row, {marginBottom : 10}]}>
          <View style={table.col}>
            <Text style={color.text}>UserName</Text>
          </View>
          <View style={table.col}>
            {!Edit ?
              <Text style={color.text}>{SafeAreaProvider.Log.Username}</Text> :
              <TextInputGlobal style={[Username.length == 0 ? textInput.Error : textInput.global, {width: '100%'}]} placeholder="UserName" onChangeText={setUsername} value={Username}></TextInputGlobal>
            }
          </View>
        </View>
        <View style={table.row}>
          <View style={table.col}>
            <Text style={color.text}>Email</Text>
            <Text style={color.text}>Last Connection</Text>
            <Text style={color.text}>Account Creation</Text>
          </View>
          <View style={table.col}>
            <Text style={color.text}>{SafeAreaProvider.Log.Email}</Text>
            <Text style={color.text}>{buildDate(SafeAreaProvider.Log["Last connection"])}</Text>
            <Text style={color.text}>{buildDate(SafeAreaProvider.Log["createdAt"])}</Text>
          </View>
        </View>
        <View style={[table.row, {marginTop : 10}]}>
          <View style={table.col}>
            <Text style={color.text}>Dark mode</Text>
          </View>
          <View style={table.col}>
            <Switch 
              value={mode}
              onValueChange={(e) => updateSwitch(e)}
              style={{thumbColor : Colors('dedalBlue')}}
              />
          </View>
        </View>
      </View>
      <View style={[global.bottomContainer]}>
        {
          !Edit ?
          <GlobalButton title="Modifier les infos" onPress={() => setEdit(true)}></GlobalButton> : 
          <GlobalButton title={Username.length == 0 ? "Annuler" : "Valider"} onPress={() => validateChange()}></GlobalButton>
        }
        {Error == true ? <Text style={[global.textCenter, color.errorRed]}>Une erreur est subvenue</Text> : null}
        <GlobalButton title="Modifier le mot de passe" onPress={() => SendVerifCode()}></GlobalButton>
      </View>
      <BasicModal Open={Open} setOpen={setOpen} Content={ModalLoginCode}/>
    </View>
  );
}
