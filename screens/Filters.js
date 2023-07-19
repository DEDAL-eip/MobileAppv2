import { Separator, Text, View } from "../constants/Themed";
import FilterButton from '../components/FilterButton';
import getFilters, { getInfoUser, setInfoUser } from "../API/Filters";
import { global, shadow, button } from "../style/styles";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDeferredValue, useEffect, useState } from "react";
import { TextButton } from "../components/buttons/TextButton";
import { ScrollView } from "react-native";
import Slider from '@react-native-community/slider';
import { useIsFocused } from "@react-navigation/native";

import '../constants/languages/i18n';
import { useTranslation } from 'react-i18next';
import { getGeneratedPlace, getPath } from "../API/Home";

/**
 * @class display Filters screen
 * @export
 * 
 * @description A function that returns a View with filters.
 * @return {HTML} 
 */
export default function Filter({ navigation }) {
  const [APIfilterz, setFilters] = useState([])
  const [infoUser, setUser] = useState({ budget: null, time: null, filter: [] })
  const [display, setDisplay] = useState(1)
  const [displayFilter, setDisplayFilters] = useState()
  const IsFocused = useIsFocused()

  const { t, i18n } = useTranslation();



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
      console.log("AAAAAAAAAAAAAAAAAH", typeof(res))
      if (res.hasError)
         setUser({ budget: null, time: null, filter: [] })
      else
        setUser(res)
    }
    getFilter()
    console.log(SafeAreaProvider.Log.lastInfo)
    if (SafeAreaProvider.Log.lastInfo == undefined)
      getInfo()
    else {
      setUser(SafeAreaProvider.Log.lastInfo)
    } 
  }, [IsFocused])

  /**
 * Hook to push filter to data
 * set data in SafeAreaProvider.filters
 */
  const assertToContext = (filter, push) => {
    console.log(filter)
    setUser(old => {
      console.log('here 2', old)

      let res = { ...old }
      console.log('here 2', old)

      if (push == true)
        res.filter.push(filter)
      else
        res.filter.splice(res.filter.indexOf(filter), 1)
      SafeAreaProvider.Log.lastInfo = res
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
                <FilterButton assertToContext={assertToContext} elem={array[index]} selected={infoUser.filter ? infoUser.filter : []} />
                <FilterButton assertToContext={assertToContext} elem={array[index + 1] ? array[index + 1] : null} selected={infoUser.filter ? infoUser.filter : []} />
              </View>
            )
          }
        })}
      </ScrollView>
    )
  }, [infoUser, APIfilterz])

  useEffect(() => {
    console.log('infoUser => ', infoUser)
  },[infoUser])


  const buildDisplayBuget = () => {
    return (
      <View style={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: 10 }} >
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
      console.log('here 1', old, e)
      let res = old
      console.log('here 1', old)
      
      if (type == 1)
        res.budget = e
      else
        res.time = e
      return res
    })
  }

  const buildDisplayLenght = () => {
    return (
      <View style={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: 10 }} >
        <View style={{ paddingBottom: '30%', display: 'flex', alignItems: 'center' }}>
          <Text>{'La durée de votre voyage est de:'}</Text>
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
      display == 1 ? buildDisplayBuget() :
        display == 2 ? displayFilter :
          display == 3 ? buildDisplayLenght() : displayFilter
    return (result)
  }

  const patchUserInfo = async () => {
    await setInfoUser(SafeAreaProvider.Log.token, SafeAreaProvider.Log.id,infoUser
    ).then(async () => {
      console.log('ui', infoUser.filter.length)
        console.log('in')
      if (infoUser.filter.lenght != 0 || infoUser.filter ) {
        console.log(SafeAreaProvider.Log.id, SafeAreaProvider.Log.token)
        await getGeneratedPlace(SafeAreaProvider.Log.id, SafeAreaProvider.Log.token).then(async (places) => {
        console.log('in 2', places)
          SafeAreaProvider.place = places
          console.log(places)
          await getPath(JSON.parse(places), { "y": 3.060966, "x": 50.631305 }, SafeAreaProvider.Log.id).then(async (path) => {
        console.log('in 3', path)

            SafeAreaProvider.map = path
          //ERROR MANAGEMENT QUAND JULIEN AURA FIX 592ecbc0-e50f-4ea1-a142-d034c20e7470
        })
      })}
      console.log('la')
    })
    navigation.navigate('Home')
  }


  const BackToBasic = async () => {
    const res = await setInfoUser(SafeAreaProvider.Log.token, SafeAreaProvider.Log.id, { budget: 0, time: 0, filter: [] })
    SafeAreaProvider.Log.lastInfo = { budget: 0, time: 0, filter: [] }
    setUser({ budget: 0, time: 0, filter: [] })
  }

  return (
    <View style={global.container}>
      <View style={global.titleContainer}>
        <View style={[global.header, shadow.Bottom]}>
          <View style={{ width: "33%", display: 'flex', alignItems: 'center' }}>
            <TextButton style={button.disable} title={t("Categories")} onPress={() => setDisplay(2)} />
          </View>
          <View style={{ width: "33%", display: 'flex', alignItems: 'center' }}>
            <TextButton title={t('budget')} onPress={() => setDisplay(1)} />
          </View>
          <View style={{ width: "33%", display: 'flex', alignItems: 'center' }}>
            <TextButton title={t('duration')} onPress={() => setDisplay(3)} />
          </View>
        </View>
      </View>

      <ScrollView style={{ height: '100%', width: '100%', display: 'flex' }}>
        {ManageDisplay()}
      </ScrollView>
      <View style={[global.titleContainer, shadow.Top]}>
        <TextButton title={t('save')} onPress={() => patchUserInfo()} />
        <TextButton title={t('reset')} onPress={() => BackToBasic()} />
      </View>
    </View>
  );
}