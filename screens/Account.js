import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "../constants/Themed";
import { useState } from "react";
import { TextInput } from "../components/TextInput";

import { global, color, textInput } from "../style/styles";
import BasicModal from "../components/modal";
import { ModalLoginCode } from "../components/Modal/Login-Code";
import { TextButton } from "../components/buttons/TextButton";

import Colors from "../constants/Colors";

import '../constants/languages/i18n';
import { useTranslation } from 'react-i18next';

/**
 * @class display Settings screen
 * @export
 * 
 * @description Display user settings
 * @return {HTML} 
 */
export default function Account() {
  const [Open, setOpen] = useState(false)
  const [Error, setError] = useState(false)
  const [Edit, setEdit] = useState(false)
  const [Username, setUsername] = useState(SafeAreaProvider.Log.Username)
  const [email, setEmail] = useState(SafeAreaProvider.Log.Email)

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

  return (
      <View style={global.container}>
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
