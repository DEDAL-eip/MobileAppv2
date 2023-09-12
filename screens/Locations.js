import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";
import { useEffect, useState } from "react";

import LocationCard from '../components/LocationCard';
import { TextButton } from "../components/buttons/TextButton";
import { getLocationOut, getLocationIn } from "../API/Locations"
import { global, shadow, button } from "../style/styles";
import '../constants/languages/i18n';
import { useTranslation } from 'react-i18next';
import { getGeneratedPlace } from "../API/Home";

/**
 * @class display Locations screen
 * @export
 * 
 * @description A function that returns a View with locations.
 * @return {HTML} 
 */
export default function Location({ navigation }) {
  const [selected, setSelected] = useState('')
  const [toDiplsay, setToDisplay] = useState([])
  const { t, i18n } = useTranslation();
  const [display, setDisplay] = useState(2)

  /**
   * Hook to push or pop filter from Selection to or from itinerary
   * set locationsInItinerary in SafeAreaProvider.itinerary
   */
  const Selector = (id) => {
    setSelected(id)
  }

  const removeToItenerary = async () => {
    let elem = SafeAreaProvider.Place.filter(elem => elem.id != selected)

    SafeAreaProvider.Place = elem
    setToDisplay(elem)
  }


  useEffect(() => {
    const getIn = async () => {
      await getLocationIn(SafeAreaProvider.Log.id).then(res => {
        if (res == undefined)
          setToDisplay([])
        else
          setToDisplay(res)
      })
    }
    const getOut = async () => {
      await getLocationOut(SafeAreaProvider.Log.id).then(res => {

        if (res == undefined)
          setToDisplay([])
        else
          setToDisplay(res)
      })
    }
    if (display === 2)
      setToDisplay(SafeAreaProvider.Place)
    if (display === 1)
      getIn()
    if (display === 3)
      getOut()
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
          toDiplsay ?
            toDiplsay.length ?
              SafeAreaProvider.Place.map((item, index) => {
                return <LocationCard key={index} Selector={Selector} item={item} selected={selected} />;
              }) :
              <View style={global.middleContainer}>
                <Text>Vous n'avez pas de Map généré pour l'instant</Text>
                <TextButton title={t('Filtres')} onPress={() => navigation.navigate('Filters')} />

              </View>
            : null
        }
      </ScrollView>

      <View style={global.titleContainer}>
        <View style={[global.header, shadow.Bottom]}>
          <View style={{ width: "33%", display: 'flex', alignItems: 'center' }}>
            <TextButton style={button.disable} title={t("Remove")} onPress={() => removeToItenerary()} />
          </View>
        </View>
      </View>
    </View>
  );
}