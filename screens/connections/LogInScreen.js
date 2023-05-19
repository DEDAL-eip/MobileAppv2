import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SecureStore from 'expo-secure-store';
import Checkbox from 'expo-checkbox';

import { signIn } from "../../API/Login";

import { View, Text, Feather, ActivityIndicator } from "../../constants/Themed";
import { global, textInput, color } from "../../style/styles";
import Colors from "../../constants/Colors";

import { TextButton } from "../../components/buttons/TextButton";
import { HideTextInput, TextInput } from "../../components/TextInput";
import { AskEmailModal } from "../../components/Modal/AskEmail";
import BasicModal from "../../components/modal";

import '../../constants/languages/i18n';
import { useTranslation } from 'react-i18next';


async function save(email, password, check) {
  await SecureStore.setItemAsync('log', JSON.stringify({ email: email, password: password, check: check }));
}

async function remove() {
  await SecureStore.deleteItemAsync('log')
}

async function getValueFor() {
  let result = await SecureStore.getItemAsync('log');
  return JSON.parse(result)
}

/**
 * @class display Login screen
 * @export
 * 
 * @description A function that returns a View to sign in or sign up.
 * @return {HTML} 
 */
export function LogInScreen({ navigation }) {
  const [Error, setError] = useState(false)
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [isChecked, setChecked] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const {t, i18n} = useTranslation();

  async function EasySignIn(email, password) {
    setLoading(true)
    if (isChecked)
      save(Email, Password, isChecked)
    else 
      remove()
    const res = await signIn(email, password)
    if (res.hasError == true)
      setError(true)
    else {
      SafeAreaProvider.Loged(true)
      SafeAreaProvider.Log = res
    }
  }

  useEffect(() => {
    const loadFromStore = async () => {
      const res = await getValueFor()
      if (res) {
        setPassword(res.password)
        setEmail(res.email)
        setChecked(true)
      }
    }
    loadFromStore()
  }, [])

  return (
    <View style={global.container}>
      { isLoading ?
        <ActivityIndicator size="large" style={{flex: 1}} />
      :
      <>
        <Feather style={{margin: 10}} name={'arrow-left'} size={24} onPress={navigation.goBack}/>

        <View style={global.basicContainer}>
          <Text style={Error ? color.errorRed : null}>{Error ? t('wrong mail or password') : ""}</Text>
          <TextInput autoCapitalize='none' autoComplete='email' style={[textInput.global, { borderColor: Colors(Error ? 'ErrorRed' : 'dedalBlue') }]} title={t('what\'s your email') + '?'} onChangeText={setEmail} value={Email} />
          <HideTextInput autoCapitalize='none' autoComplete='password' style={[textInput.global, { borderColor: Colors(Error ? 'ErrorRed' : 'dedalBlue') }]} title={t('what\'s your password') + '?'} onChangeText={setPassword} value={Password} />
        </View>
      
        <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 25, marginTop: 10 }}>
          <Checkbox value={isChecked} onValueChange={() => setChecked(!isChecked)} />
          <Text>{'  ' + t('remember me')}</Text>
        </View>

        <View style={global.bottomContainer}>
            <TextButton title={t('log in')} onPress={() => EasySignIn(Email, Password)} />
          <Text style={{ marginTop: 15, fontSize: 14 }} onPress={() => setOpen(true)} >{t('forgot your password') + "?"}</Text>
        </View>

        <BasicModal Open={isOpen} setOpen={setOpen} Content={AskEmailModal} />
      </>
      }
    </View>
  )
}