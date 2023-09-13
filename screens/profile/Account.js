import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "../../constants/Themed";
import { useState } from "react";
import { TextInput } from "../../components/TextInput";

import { global, text, color, textInput } from "../../style/styles";
import BasicModal from "../../components/modal";
import { ModalLoginCode } from "../../components/Modal/Login-Code";
import { TextButton } from "../../components/buttons/TextButton";
import { Switch } from "../../components/Switch";

import Colors from "../../constants/Colors";

import '../../constants/languages/i18n';
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
  const [isProfessional, setIsProfessional] = useState(SafeAreaProvider.Log.isProfessional)

  const {t, i18n} = useTranslation();

  const updateSwitch = (e) => {
    setIsProfessional(e)
    if (e)
      SafeAreaProvider.Log.isProfessional = true
    else 
      SafeAreaProvider.Log.isProfessional = false
  }

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
      <View style={[global.container, {padding: 15}]}>
        <Text style={[text.medium]}>{t('profile')}</Text>
        <View style={{ paddingBottom: 15 }}>
          <TextInput style={[textInput.global, { borderColor: Colors('dedalBlue') }]} title={t('username')} onChangeText={setUsername} value={Username} editable={Edit ? true : false} />
          <TextInput style={[textInput.global, { borderColor: Colors('dedalBlue') }]} title={t('email')} value={email} editable={Edit ? true : false} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput style={[textInput.global, { width: '60%', borderColor: Colors('dedalBlue') }]} title={t('last connection')} value={buildDate(SafeAreaProvider.Log["Last connection"])} editable={false} />
            <TextInput style={[textInput.global, { width: '60%', borderColor: Colors('dedalBlue') }]} title={t('account creation')} value={buildDate(SafeAreaProvider.Log["createdAt"])} editable={false} />
          </View>
          {Error == true ? <Text style={[global.textCenter, color.errorRed]}>{t('an error occured')}</Text> : null}
          {!Edit ?
            <TextButton style={{alignSelf: "center"}} title={t('modify informations')} onPress={() => setEdit(true)} /> : 
            <TextButton style={{alignSelf: "center"}} title={Username.length == 0 ? t('cancel') : t('confirm')} onPress={() => validateChange()} />
          }
        </View>
        <BasicModal Open={Open} setOpen={setOpen} Content={ModalLoginCode}/>
        <Text style={[text.medium]}>{t('plan')}</Text>
        <View style={{ paddingBottom: 15 }}>
          <Switch
            title={t('professional mode')}
            value={isProfessional}
            onValueChange={updateSwitch}
          />
        </View>
        <Text style={[text.medium]}>{t('security')}</Text>
        <View style={{ paddingBottom: 15 }}>
          <TextButton style={{alignSelf: "center"}} title={t('modify password')} onPress={() => SendVerifCode()} />
          {/* Function to logout on every device to develop
            <TextButton style={{alignSelf: "center"}} title={t('logout of every device')} onPress={() => SendVerifCode()} />
          */}
        </View>
      </View>
  );
}
