import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "../../constants/Themed";
import { useState } from "react";

import { global, text, color, textInput } from "../../style/styles";
import { Picker } from "../../components/Picker";
import { Switch } from "../../components/Switch";

import '../../constants/languages/i18n';
import { useTranslation } from 'react-i18next';

/**
 * @class display Settings screen
 * @export
 * 
 * @description Display user settings
 * @return {HTML} 
 */
export default function Settings() {
  const [mode, setMode] = useState(SafeAreaProvider.mode=='dark' ? true : false)
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const languages = [['english', 'en'], ['french', 'fr']]

  const {t, i18n} = useTranslation();

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
      <Text style={[text.medium]}>{'Affichage'}</Text>
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
