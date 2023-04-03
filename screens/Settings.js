import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "../constants/Themed";
import { Switch } from "react-native";
import { useState } from "react";

import { global, color, table, textInput } from "../style/styles";
import { MypatchParams, SendCode } from "../API/Settings";
import BasicModal from "../components/modal";
import { TextButton } from "../components/buttons/TextButton";
import { ModalLoginCode } from "../components/Modal/Login-Code";
import { TextInputGlobal } from "../components/TextInput";
import { MyPicker } from "../components/Picker";

import '../constants/languages/i18n';
import { useTranslation } from 'react-i18next';
import Colors from "../constants/Colors";

/**
 * @class display Settings screen
 * @export
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
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  const languages = [['english', 'en'], ['french', 'fr']]

  const {t, i18n} = useTranslation();

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
    if (e)
      SafeAreaProvider.mode =('dark')
    else 
      SafeAreaProvider.mode = ('light')
  }

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setSelectedLanguage(value), SafeAreaProvider.language = (value))
      .catch(err => console.log(err));
  };

  return (
    <View style={global.container}>
      <View style={global.middleContainer}>
        <View style={[table.row, {marginBottom : 10}]}>
          <View style={table.col}>
            <Text>{t('username')}</Text>
          </View>
          <View style={table.col}>
            {!Edit ?
              <Text>{SafeAreaProvider.Log.Username}</Text> :
              <TextInputGlobal style={[Username.length == 0 ? textInput.Error : textInput.global, {width: '100%'}]} placeholder="UserName" onChangeText={setUsername} value={Username}></TextInputGlobal>
            }
          </View>
        </View>
        <View style={table.row}>
          <View style={table.col}>
            <Text>{t('email')}</Text>
            <Text>{t('last connection')}</Text>
            <Text>{t('account creation')}</Text>
          </View>
          <View style={table.col}>
            <Text>{SafeAreaProvider.Log.Email}</Text>
            <Text>{buildDate(SafeAreaProvider.Log["Last connection"])}</Text>
            <Text>{buildDate(SafeAreaProvider.Log["createdAt"])}</Text>
          </View>
        </View>
        <View style={[table.row, {marginTop : 10}]}>
          <View style={table.col}>
            <Text>{t('language')}</Text>
          </View>
          <View style={table.col}>
            <MyPicker
              items={languages}
              selectedValue={selectedLanguage}
              onValueChange={changeLanguage}
            />
          </View>
        </View>
        <View style={[table.row, {marginTop : 10}]}>
          <View style={table.col}>
            <Text>{t('dark mode')}</Text>
          </View>
          <View style={[table.col, {paddingRight: 50}]}>
            <Switch
              trackColor={{ true: Colors('dedalBlue'), false:Colors('dedalBlueDisable') }}
              thumbColor={Colors('dedalBlue')}
              value={mode}
              onValueChange={(e) => updateSwitch(e)}
              />
          </View>
        </View>
      </View>
      <View style={[global.bottomContainer]}>
        {
          !Edit ?
          <TextButton title={t('modify informations')} onPress={() => setEdit(true)}></TextButton> : 
          <TextButton title={Username.length == 0 ? t('cancel') : t('confirm')} onPress={() => validateChange()}></TextButton>
        }
        {Error == true ? <Text style={[global.textCenter, color.errorRed]}>An error occured</Text> : null}
        <TextButton title={t('modify password')} onPress={() => SendVerifCode()}></TextButton>
      </View>
      <BasicModal Open={Open} setOpen={setOpen} Content={ModalLoginCode}/>
    </View>
  );
}
