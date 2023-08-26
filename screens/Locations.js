import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView, View, Text, Modal } from "react-native";
import { useEffect, useState } from "react";

import LocationCard from '../components/LocationCard';
import { TextButton } from "../components/buttons/TextButton";
import { getLocationOut, getLocationIn } from "../API/Locations"
import { global, shadow, button } from "../style/styles";
import '../constants/languages/i18n';
import { useTranslation } from 'react-i18next';
import { getGeneratedPlace } from "../API/Home";
import { Button } from "react-native-paper";
import Colors from "../constants/Colors";
import { Separator } from "../constants/Themed";

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
  const [popup, setpopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
        console.log("getin", res)
        if (res == undefined)
          setToDisplay([])
        else
          setToDisplay(res)
      })
    }
    const getOut = async () => {
      await getLocationOut(SafeAreaProvider.Log.id).then(res => {
        console.log("getout", res)
        console.log(SafeAreaProvider.Place)

        if (res == undefined)
          setToDisplay([])
        else
          setToDisplay(res)
      })
    }
    console.log(display)
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
            <TextButton style={button.disable} title={t("itinerary")} onPress={() => setDisplay(2)} />
          </View>
          <View style={{ width: "33%", display: 'flex', alignItems: 'center' }}>
            <TextButton title={t('interest')} onPress={() => setDisplay(1)} />
          </View>
          <View style={{ width: "33%", display: 'flex', alignItems: 'center' }}>
            <TextButton title={t('near you')} onPress={() => setDisplay(3)} />
          </View>
        </View>
      </View>

      <ScrollView>
        {
          toDiplsay ?
            toDiplsay.length ?
              SafeAreaProvider.Place.map((item) => {
                console.log("item", item)
                return (
                <View style={{alignItems: 'center'}}>
                  <TextButton title={item['name']} /*key={index} Selector={Selector} item={item}*/ 
                  selected={selected} onPress={() => {
                    setSelectedItem(item);
                    setpopup(true);}}/>
                  <Modal transparent={true} visible={popup}>
                    <View style={[global.container]}>
                      <View style={{backgroundColor:"#ffffff", margin:50, padding:40, borderRadius:10, flex:1}}>
                        <Text style={{ fontSize:30 }}>{selectedItem && selectedItem['name']}</Text>
                      
                        <Text style={ { borderColor: Colors('dedalBlue'), borderRadius:5 }}>{t("address")}: {selectedItem && selectedItem['address']}</Text>
                        <Button onPress={() => setpopup(false)}>Close</Button>
                      </View>
                    </View>
                  </Modal>
                </View>
                );
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