import { Separator, Text, View } from "../constants/Themed";
import FilterButton from '../components/FilterButton';
import getFilters, { getInfoUser, setInfoUser } from "../API/Filters";
import { global, shadow, button } from "../style/styles";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import { Title } from "../components/Title";
import { TextButton } from "../components/Buttons/TextButton";
import { ScrollView } from "react-native";
import Slider from '@react-native-community/slider';

import '../constants/languages/i18n';
import { useTranslation } from 'react-i18next';

/**
 * @class display Filters screen
 * @export
 * 
 * @description A function that returns a View with filters.
 * @return {HTML} 
 */
export default function Filter() {
  const [APIfilterz, setFilters] = useState([])
  const [infoUser, setUser] = useState({ budget: null, time: null, filter: [] })
  const [display, setDisplay] = useState(1)
  const [displayFilter, setDisplayFilters] = useState()
  const {t, i18n} = useTranslation();

  useEffect(() => {
    /**
     * Hook to get filter data to user
     * set filters
     */
    const getFilter = async () => {
      const res = await getFilters(SafeAreaProvider.Log.token)
      setFilters(res)
    }
    const getInfo = async () => {
      const res = await getInfoUser(SafeAreaProvider.Log.token, SafeAreaProvider.Log.id)
      setUser(res)
      console.log("GET INFO", res)
    }

    getFilter()
    getInfo()
  }, [])

  /**
 * Hook to push filter to data
 * set data in SafeAreaProvider.filters
 */
  const assertToContext = (filter, push) => {
    console.log("ASSERT TO CONTEXT", filter, push)
    setUser(old => {
      let res = { ...old }
      if (push == true)
        res.filter.push(filter)
      else 
        res.filter.splice(res.filter.indexOf(filter), 1)
      return res
    })
  }

  /**
   * Hook to return repeatedly Views with FilterButton from filters fetch from API
   */
  useEffect(() => {
    setDisplayFilters(
      <ScrollView style={{ marginBottom: 20 }}>
        {APIfilterz.map((filtre, index, array) => {
          if (!(index % 2)) {
            return (
              <View key={index} style={[global.row]}>
                <FilterButton assertToContext={assertToContext} elem={array[index]} selected={infoUser.filter} />
                <FilterButton assertToContext={assertToContext} elem={array[index + 1] ? array[index + 1] : null} selected={infoUser.filter} />
              </View>
            )
          }
        })}
      </ScrollView>
      )
  },[infoUser])

  const buildDisplayBuget = () => {
    return (
      <View style={{ width: '90%', display: 'flex', alignItems: 'center', marginTop: 10 }} >
        <View style={{ paddingBottom: '30%', display: 'flex', alignItems: 'center' }}>
          <Text>Le budget de votre voyage est de : </Text>
          <Text>{infoUser.budget || 0} €</Text>
          <Separator />
        </View>
        <Slider
          style={{ width: '100%', paddingTop: '30%' }}
          maximumValue={300}
          minimumValue={0}
          minimumTrackTintColor="#ffffff"
          maximumTrackTintColor="#ffffff"
          step={5}
          value={infoUser.budget || 0}
          onValueChange={(e) => handleChange(1, e)}
        />
      </View>
    )
  }

  const handleChange = (type, e) => {
    setUser(old => {
      let res = { ...old }
      if (type == 1)
        res.budget = e
      else
        res.time = e
      return res
    })
  }

  const buildDisplayLenght = () => {
    return (
      <View style={{ width: '90%', display: 'flex', alignItems: 'center', marginTop: 10 }} >
        <View style={{ paddingBottom: '30%', display: 'flex', alignItems: 'center' }}>
          <Text>La durée de votre voyage est de : </Text>
          <Text>{infoUser.time || 0} heure{(infoUser.time || 0) > 1 ? 's' : ''}</Text>
          <Separator />
        </View>
        <Slider
          style={{ width: '100%', paddingTop: '30%' }}
          maximumValue={12}
          minimumValue={0}
          minimumTrackTintColor="#ffffff"
          maximumTrackTintColor="#ffffff"
          step={1}
          value={infoUser.time || 0}
          onValueChange={(e) => handleChange(0, e)}
        />
      </View>
    )
  }

  const ManageDisplay = () => {
    const result =
      display == 1 ? displayFilter :
        display == 2 ? buildDisplayBuget() :
          display == 3 ? buildDisplayLenght() : displayFilter
    return (result)
  }

  const patchUserInfo = async () => {
    const res = await setInfoUser(SafeAreaProvider.Log.token, SafeAreaProvider.Log.id, infoUser)
    console.log("PATCH USER INFO", res.status)
  }


  const BackToBasic = async () => {
    console.log(SafeAreaProvider.Log.token)
    const res = await getInfoUser(SafeAreaProvider.Log.token, SafeAreaProvider.Log.id)
    setUser(res)
  }

  return (
    <View style={global.container}>
      <Title title={t('filters')} />
      <View style={global.middleContainer}>
        <View style={[global.header, shadow.Bottom]}>
          <View style={{ width: "33%", display: 'flex', alignItems: 'center' }}>
            <TextButton style={button.disable} title="Categories" onPress={() => setDisplay(1)}></TextButton>
          </View>
          <View style={{ width: "33%", display: 'flex', alignItems: 'center' }}>
            <TextButton title="Buget" onPress={() => setDisplay(2)}></TextButton>
          </View>
          <View style={{ width: "33%", display: 'flex', alignItems: 'center' }}>
            <TextButton title="Durée" onPress={() => setDisplay(3)}></TextButton>
          </View>
        </View>
        <View style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          {ManageDisplay()}
        </View>
      </View>
      <View style={[global.bottomContainer, shadow.Top]}>
        <TextButton title='Sauvegarder' onPress={() => patchUserInfo()}></TextButton>
        <TextButton title='Reinitialiser' onPress={() => BackToBasic()}></TextButton>
      </View>
    </View>
  );
}