import { View } from "../../constants/Themed";

import { global, text, color, textInput } from "../../style/styles";

import '../../constants/languages/i18n';
import { useTranslation } from 'react-i18next';

/**
 * @class display Settings screen
 * @export
 * 
 * @description Display user settings
 * @return {HTML} 
 */
export default function LocationsSearch() {
  const {t, i18n} = useTranslation();

  return (
    <View style={[global.container, {padding: 15}]}>

    </View>
  );
}
