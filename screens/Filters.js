import { Separator, Text, View } from "../constants/Themed";
import FilterButton from '../components/FilterButton';
import getFilters from "../API/Filters";
import { global, shadow, button } from "../style/styles";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Title } from "../components/Title";
import { GlobalButton } from "../components/Button";
import { ScrollView } from "react-native";
import Slider from '@react-native-community/slider';

/**
 * @class display Filters screen
 * @export
 * 
 * @description A function that returns a View with filters.
 * @return {HTML} 
 */
export default function Filter() {
  const [APIfilterz, setFilters] = useState([])
  const [display, setDisplay] = useState(1)
  const [budget, setBudget] = useState(0)
  const [lenght, setLenght] = useState(0)
  const data = []

  useEffect(() => {
    /**
     * Hook to get filter data to user
     * set filters
     */
    const getFilter = async () => {
      const res = await getFilters(SafeAreaProvider.Log.token)
      setFilters(res)
    }

    getFilter()
  }, [])

  /**
   * Hook to return repeatedly Views with FilterButton from filters fetch from API
   */
  const buildDisplayFilters = () => {
    return (
      <ScrollView style={{ marginBottom: 20 }}>
        {APIfilterz.map((filtre, index, array) => {
          if (!(index % 2)) {
            return (
              <View key={index} style={[global.row]}>
                <FilterButton assertToContext={assertToContext} text={array[index].name} />
                <FilterButton assertToContext={assertToContext} text={array[index + 1] ? array[index + 1].name : null} />
              </View>
            )
          }
        })}
      </ScrollView>
    )
  }


  /**
   * Hook to push filter to data
   * set data in SafeAreaProvider.filters
   */
   const assertToContext = (filter, push) => {
    if (push == true)
      data.push(filter);
    else
      data.pop(filter)
    SafeAreaProvider.filters = data
  }

  const buildDisplayBuget = () => {
    return (
      <View style={{ width: '90%', display: 'flex', alignItems: 'center', marginTop: 10 }} >
        <View style={{ paddingBottom: '30%', display: 'flex', alignItems: 'center' }}>
          <Text>Le budget de votre voyage est de : </Text>
          <Text>{budget} €</Text>
        </View>
        <Separator />
        <Slider
          style={{ width: '100%', paddingTop: '30%' }}
          maximumValue={300}
          minimumValue={0}
          minimumTrackTintColor="#ffffff"
          maximumTrackTintColor="#ffffff"
          step={5}
          value={budget}
          onValueChange={(e) => setBudget(e)}
        />
      </View>
    )
  }

  const buildDisplayLenght = () => {
    return (
      <View style={{ width: '90%', display: 'flex', alignItems: 'center', marginTop: 10 }} >
        <View style={{ paddingBottom: '30%', display: 'flex', alignItems: 'center' }}>
          <Text>La durée de votre voyage est de : </Text>
          <Text>{lenght} heure{lenght > 1 ? 's' : ''}</Text>
        </View>
        <Separator />
        <Slider
          style={{ width: '100%', paddingTop: '30%' }}
          maximumValue={12}
          minimumValue={0}
          minimumTrackTintColor="#ffffff"
          maximumTrackTintColor="#ffffff"
          step={1}
          value={lenght}
          onValueChange={(e) => setLenght(e)}
        />
      </View>
    )
  }

  const ManageDisplay = () => {
    const result =
      display == 1 ? buildDisplayFilters() :
        display == 2 ? buildDisplayBuget() :
          display == 3 ? buildDisplayLenght() : buildDisplayFilters()
    return (result)
  }

  return (
    <View style={global.container}>
      <Title title={'Filtres'} />
      <View style={global.middleContainer}>
        <View style={[global.header, shadow.Bottom]}>
          <View style={{ width: "33%", display: 'flex', alignItems: 'center' }}>
            <GlobalButton style={button.disable} title="Categories" onPress={() => setDisplay(1)}></GlobalButton>
          </View>
          <View style={{ width: "33%", display: 'flex', alignItems: 'center' }}>
            <GlobalButton title="Buget" onPress={() => setDisplay(2)}></GlobalButton>
          </View>
          <View style={{ width: "33%", display: 'flex', alignItems: 'center' }}>
            <GlobalButton title="Durée" onPress={() => setDisplay(3)}></GlobalButton>
          </View>
        </View>
        <View style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          {ManageDisplay()}
        </View>
      </View>
      <View style={[global.bottomContainer, shadow.Top]}>
        <GlobalButton title="Valider" onPress={() => setDisplay(2)}></GlobalButton>
        <GlobalButton title="Supprimer la séléction" onPress={() => setDisplay(2)}></GlobalButton>
      </View>
    </View>
  );
}