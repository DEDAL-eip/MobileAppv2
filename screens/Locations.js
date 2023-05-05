import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";
import { useEffect, useState } from "react";

import LocationCard from '../components/LocationCard';
import { TextButton } from "../components/buttons/TextButton";
import { getLocationOut, getLocationIn } from "../API/Locations"
import { global, shadow, button } from "../style/styles";
import '../constants/languages/i18n';
import { useTranslation } from 'react-i18next';

/**
 * @class display Locations screen
 * @export
 * 
 * @description A function that returns a View with locations.
 * @return {HTML} 
 */
export default function Location({ navigation }) {
  const [Selection, setSelection] = useState("")
  const [Locations, setLocations] = useState([])
  const { t, i18n } = useTranslation();
  const [display, setDisplay] = useState(1)

  /**
   * Hook to push or pop filter from Selection to or from itinerary
   * set locationsInItinerary in SafeAreaProvider.itinerary
   */
  const assertToItinerary = (location) => {
    return
    switch (Selection) {
      case 'Out filters':
        location[0] = "Out filters: " + location[0]
        locationsOutFilters.splice(locationsOutFilters.indexOf(location))
        locationsInItinerary.push(location)
        break
      case 'Out itinerary':
        location[0] = "Out itinerary: " + location[0]
        locationsOutItinerary.splice(locationsOutItinerary.indexOf(location))
        locationsInItinerary.push(location)
        break
      case 'In itinerary':
        locationsInItinerary.splice(locationsInItinerary.indexOf(location))
        break
    }
    SafeAreaProvider.itinerary = locationsInItinerary
  }

  const ManageDisplay = () => {
    const result = 1
    return (result)
  }

  useEffect(() => {
    const tmp = async () => {
      let res1 = await getLocationOut(SafeAreaProvider.Log.id)
      let res2 = await getLocationIn(SafeAreaProvider.Log.id)
      console.log('res2 => ', res2 + '\n' + res1)
    }
    tmp()
  }, [])


  useEffect(() => {
    if (display === 2)
      console.log('Votre Itineraire')
    if (display === 1)
      console.log('Interet')
    if (display === 3)
      console.log('Proche de vous')
    console.log('display changed to ', display)
    console.log(SafeAreaProvider.Place)
  }, [display])

  return (
    <View style={global.container}>
      <View style={global.titleContainer}>
        <View style={[global.header, shadow.Bottom]}>
          <View style={{ width: "33%", display: 'flex', alignItems: 'center' }}>
            <TextButton style={button.disable} title={t("Votre itineraire")} onPress={() => setDisplay(2)} />
          </View>
          <View style={{ width: "33%", display: 'flex', alignItems: 'center' }}>
            <TextButton title={t('Interet ?')} onPress={() => setDisplay(1)} />
          </View>
          <View style={{ width: "33%", display: 'flex', alignItems: 'center' }}>
            <TextButton title={t('Proche de vous')} onPress={() => setDisplay(3)} />
          </View>
        </View>
      </View>

      <ScrollView>
        {
          SafeAreaProvider.Place ?
            SafeAreaProvider.Place.map((item, index) => {
              return <LocationCard key={index} assertToItinerary={assertToItinerary} item={item} />;
            }) :
            <View style={global.middleContainer}>
              <Text>Vous n'avez pas de Map généré pour l'instant</Text>
              <TextButton title={t('Filtres')} onPress={() => navigation.navigate('Filters')} />

            </View>
        }
      </ScrollView>

      <View style={global.titleContainer}>
        <View style={[global.header, shadow.Bottom]}>
          <View style={{ width: "33%", display: 'flex', alignItems: 'center' }}>
            <TextButton style={button.disable} title={t("Ajouter")} onPress={() => console.log('add')} />
          </View>
        </View>
        {/* <View style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            {ManageDisplay()}
          </View> */}
      </View>
    </View>
    // <View style={global.container}>
    //   <View style={global.middleContainer}>
    //     <TextButton title={t('in itinerary')} disable={Selection === 'In itinerary'} onPress={() => {
    //       setSelection('In itinerary')
    //       setLocations(SafeAreaProvider.itinerary)
    //       console.log('Debug => ', SafeAreaProvider.itinerary)
    //     }} />
    //     <TextButton title={t('out itinerary')} disable={Selection === 'Out itinerary'} onPress={() => {
    //       setSelection('Out itinerary')
    //       setLocations(locationsOutItinerary)
    //     }} />
    //     <TextButton title={t('out filters')} disable={Selection === 'Out filters'} onPress={() => {
    //       setSelection('Out filters')
    //       setLocations(locationsOutFilters)
    //     }} />
    //     <ScrollView>
    //       {Locations.map((item, index) => {
    //         return <LocationCard key={index} assertToItinerary={assertToItinerary} name={item[0]} description={item[1]} />;
    //       })}
    //     </ScrollView>
    //   </View>
    // </View>
  );
}