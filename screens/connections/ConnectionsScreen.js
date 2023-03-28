import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { google, nextG } from "../../API/Login";

import { global } from "../../style/styles";
import { Separator, View } from "../../constants/Themed";

import { HomeTitle } from "../../components/Title";
import { TextButton } from "../../components/buttons/TextButton";

/**
 * @class display Login screen
 * @export
 * 
 * @description A function that returns a View to sign in or sign up.
 * @return {HTML} 
 */
export function ConnectionsScreen({ navigation }) {
  const url = Linking.useURL()

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
        <HomeTitle title='DEDAL' pict={require('../../assets/logo.png')} subtitle='The path to your culture' />
      </View>
      <View style={global.middleContainer}>
        <TextButton title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
        <TextButton title="Google" onPress={() => createGoogleAccount()} />
        <View style={{ width: '25%', paddingBottom: 20, paddingTop: 20 }}>
          <Separator />
        </View>
        <TextButton title="Log In" onPress={() => navigation.navigate('LogIn')} />
      </View>
    </View>
  );
}