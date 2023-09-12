import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { useEffect } from "react";
import { Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { google, nextG } from "../../API/Login";

import { global, text } from "../../style/styles";
import { Separator, Text, View } from "../../constants/Themed";

import { TextButton } from "../../components/buttons/TextButton";

import '../../constants/languages/i18n';
import { useTranslation } from 'react-i18next';

/**
 * @class display Login screen
 * @export
 * 
 * @description A function that returns a View to sign in or sign up.
 * @return {HTML} 
 */
export function ConnectionsScreen({ navigation }) {
  const url = Linking.useURL()
  const {t, i18n} = useTranslation();

  const createGoogleAccount = async () => {
    let callbackUrl = Linking.createURL()
    await WebBrowser.openBrowserAsync(`https://dedal.auth.eu-west-1.amazoncognito.com/login?client_id=cse59djt26m2kikuacurl26uj&response_type=code&scope=email+openid+profile&redirect_uri=${callbackUrl}`)
  }

  const logInGoogleAccount = async (code) => {
    let callbackUrl = Linking.createURL()
    let res = await google(code, callbackUrl)
    if (res.error)
      setError(true)
    else
      nextGoogle(res)
  }

  const nextGoogle = async (res) => {
    let result = await nextG(res)
    if (result.error)
      setError(true)
    else {
      SafeAreaProvider.Loged(true)
      SafeAreaProvider.Log = result
    }
  }

  useEffect(() => {
    if (url) {
      const { queryParams } = Linking.parse(url);
      if (queryParams.code)
        logInGoogleAccount(queryParams.code)
    }
  }, [url])

  return (
    <View style={global.container}>
      <View style={global.titleContainer}>
        <Image style={text.image} source={require('../../assets/logo.png')} />
        <Text style={text.large}>{'DEDAL'}</Text>
        <Text style={text.small}>{t('the path to your culture') + '.'}</Text>
      </View>
      <View style={global.middleContainer}>
        <TextButton title={t('sign up')} onPress={() => navigation.navigate('SignUp')} />
        <TextButton title={'Google'} onPress={() => createGoogleAccount()} />
        <View style={{ paddingBottom: 20, paddingTop: 20 }} />
        <TextButton title={t('log in')} onPress={() => navigation.navigate('LogIn')} />
      </View>
    </View>
  );
}