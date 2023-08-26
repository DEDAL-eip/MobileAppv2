import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "../../constants/Themed";
import { useState } from "react";

import { button, global, color, textInput, text } from "../../style/styles";
import { MypatchParams, SendCode } from "../../API/Settings";
import BasicModal from "../../components/modal";
import { TextButton } from "../../components/buttons/TextButton";
import { ModalLoginCode } from "../../components/Modal/Login-Code";
import { TextInput } from "../../components/TextInput";
import { Picker } from "../../components/Picker";
import { Switch } from "../../components/Switch";
import { Feather } from '@expo/vector-icons';

import Colors from "../../constants/Colors";

import '../../constants/languages/i18n';
import { useTranslation } from 'react-i18next';


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
  const [email, setEmail] = useState(SafeAreaProvider.Log.Email)
  const [mode, setMode] = useState(SafeAreaProvider.mode=='dark' ? true : false)
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const {t, i18n} = useTranslation();
  const languages = [[t('english'), 'en'], [t('french'), 'fr']]


  /**
   * Call API to send verification code 
   * And open CHange password modal
   */
  const SendVerifCode = ( async () => {
    const res = await SendCode(SafeAreaProvider.Log.Email)
    if (res.status == 204) {
      setOpen(true)
    } else {
      setError(true)
    }
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
    <View style={[global.container, {padding: 15}]}>
      <Text style={[text.medium]}>{t('display')}</Text>
      <Picker
        title={t('language')}
        items={languages}
        selectedValue={selectedLanguage}
        onValueChange={changeLanguage}
      />
      <Switch
        title={t('dark mode')}
        value={mode}
        onValueChange={updateSwitch}
      />
    </View>
  );
}
