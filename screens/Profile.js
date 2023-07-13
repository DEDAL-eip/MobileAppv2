import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "../constants/Themed";
import { useState } from "react";

import { button, global, color, textInput } from "../style/styles";
import { MypatchParams, SendCode } from "../API/Settings";
import BasicModal from "../components/modal";
import { TextButton } from "../components/buttons/TextButton";
import { ModalLoginCode } from "../components/Modal/Login-Code";
import { TextInput } from "../components/TextInput";
import { Picker } from "../components/Picker";
import { Switch } from "../components/Switch";
import { Feather } from '@expo/vector-icons';

import Colors from "../constants/Colors";

import '../constants/languages/i18n';
import { useTranslation } from 'react-i18next';

/**
 * @class display Profile screen
 * @export
 * 
 * @description Display user profile
 * @return {HTML} 
 */
export default function Profile() {

  const [Open, setOpen] = useState(false)
  const [Error, setError] = useState(false)
  const [Edit, setEdit] = useState(false)
  const [Username, setUsername] = useState(SafeAreaProvider.Log.Username)
  const [email, setEmail] = useState(SafeAreaProvider.Log.Email)
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
    <View style={global.container}>
      <View style={{ flexDirection: 'row', padding: 25, justifyContent: "space-between" }}>
        <Feather name={"log-out"} size={24} onPress={() => SafeAreaProvider.Loged(false)} color={Colors('dedalBlue')} />
        <Feather name={"settings"} size={24} color={Colors('dedalBlue')} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: "50%" }}>
          <Picker
            title={t('language') + ':'}
            items={languages}
            selectedValue={selectedLanguage}
            onValueChange={changeLanguage}
          />
        </View>
        <View style={{ width: "50%", alignItems: 'center' }}>
          <Switch
            title={t('dark mode') + ':'}
            value={mode}
            onValueChange={updateSwitch}
          />
        </View>
      </View>
      <View style={global.middleContainer}>
        <TextInput autoCapitalize='none' style={[textInput.global, { borderColor: Colors('dedalBlue') }]} title={t('username') + ':'} onChangeText={setUsername} value={Username} editable={Edit ? true : false} />
        <TextInput autoCapitalize='none' style={[textInput.global, { borderColor: Colors('dedalBlue') }]} title={t('email') + ':'} value={email} editable={Edit ? true : false} />
        <View style={{ flexDirection: 'row'}}>
          <View style={{ width: "50%", alignItems: 'center' }}>
            <TextInput autoCapitalize='none' style={[textInput.global, { borderColor: Colors('dedalBlue') }]} title={t('last connection') + ':'} value={buildDate(SafeAreaProvider.Log["Last connection"])} editable={false} />
          </View>
          <View style={{ width: "50%", alignItems: 'center' }}>
            <TextInput autoCapitalize='none' style={[textInput.global, { borderColor: Colors('dedalBlue') }]} title={t('account creation') + ':'} value={buildDate(SafeAreaProvider.Log["createdAt"])} editable={false} />
          </View>
        </View>
      </View>
      <View style={[global.bottomContainer]}>
        {Error == true ? <Text style={[global.textCenter, color.errorRed]}>An error occured</Text> : null}
        <TextButton title={t('modify password')} onPress={() => SendVerifCode()}></TextButton>
        {
          !Edit ?
          <TextButton title={t('modify informations')} onPress={() => setEdit(true)}></TextButton> : 
          <TextButton title={Username.length == 0 ? t('cancel') : t('confirm')} onPress={() => validateChange()}></TextButton>
        }
      </View>
      <BasicModal Open={Open} setOpen={setOpen} Content={ModalLoginCode}/>
    </View>
  );
}
