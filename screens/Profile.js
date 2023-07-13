import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "../constants/Themed";
import { useState } from "react";
import { Menu, Divider, PaperProvider } from 'react-native-paper';

import { global, titles, textInput } from "../style/styles";
import { MypatchParams, SendCode } from "../API/Settings";
import { Feather } from '@expo/vector-icons';

import Colors from "../constants/Colors";

import '../constants/languages/i18n';
import { useTranslation } from 'react-i18next';
import { Image } from "react-native";

/**
 * @class display Profile screen
 * @export
 * 
 * @description Display user profile
 * @return {HTML} 
 */
export default function Profile({ navigation }) {
  const [Open, setOpen] = useState(false)
  const [Error, setError] = useState(false)
  const [Edit, setEdit] = useState(false)
  const [email, setEmail] = useState(SafeAreaProvider.Log.Email)
  const [visible, setVisible] = useState(false);

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

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

  return (
    <PaperProvider
      settings={{
        icon: props => <Feather {...props} />,
      }}
    >
      <View style={global.container}>
        <View
          style={{
            padding: 25,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Feather color={Colors('dedalBlue')} name={"menu"} size={24} onPress={openMenu} />}>
            <Menu.Item leadingIcon="key" onPress={() => navigation.navigate('Account')} title="Account" />
            <Menu.Item leadingIcon="settings" onPress={() => navigation.navigate('Settings')} title="Settings" />
            <Divider />
            <Menu.Item leadingIcon="log-out" onPress={() => SafeAreaProvider.Loged(false)} title="Log out" />
          </Menu>
        </View>
        <View style={{flexDirection: 'row', paddingLeft: 15}}>
          <Image style={{width: 150, height: 150, borderColor: '#294F87', borderWidth: 5, borderRadius: 100}} source={require('../assets/images/icon.png')} />
          <View style={{alignSelf: 'center', paddingLeft: 10}}>
            <Text style={[titles.username]} autoCapitalize='none'>{SafeAreaProvider.Log.Username}</Text>
            <Text>{SafeAreaProvider.Log.Email}</Text>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
}
