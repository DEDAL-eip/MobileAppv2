import { SafeAreaProvider } from "react-native-safe-area-context";

import { Text, View } from "../../constants/Themed";
import { useEffect, useState } from "react";

import { global, textInput } from "../../style/styles";
import LocationCard from '../../components/LocationCard';
import { TextInput } from "../../components/TextInput";

import { getLocationIn } from "../../API/Locations"


import '../../constants/languages/i18n';
import { useTranslation } from 'react-i18next';
import { ScrollView } from "react-native";

import Colors from "../../constants/Colors";

/**
 * @class display Settings screen
 * @export
 * 
 * @description Display user settings
 * @return {HTML} 
 */
export default function LocationsSearch() {
  const {t, i18n} = useTranslation();
  const [search, setSearch] = useState('')
  const [location, setLocations] = useState([])


  useEffect(() => {
      const getIn = async () => {
      await getLocationIn(SafeAreaProvider.Log.id).then(res => {
        // console.log(res)
        if (res == undefined)
          SafeAreaProvider.Place = []
        else
          SafeAreaProvider.Place = res
          console.log(res)
        })
    }
    getIn()
  }, [])
  
  return (
    <View style={[global.container, {padding: 15}]}>
      <TextInput style={[textInput.global, { borderColor: Colors('dedalBlue') }]} onChangeText={setSearch} value={search} editable={true} />
      <ScrollView>
        {SafeAreaProvider.Place.map((item, index) => {
          return <LocationCard key={index} item={item} />
        })}
      </ScrollView>
    </View>
  );
}
