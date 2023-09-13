import { useState, useEffect } from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { global, map } from "../style/styles";
import * as Location from 'expo-location';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import { getPlace, getMap, getPath, getGeneratedPlace } from "../API/Home";
import Colors from "../constants/Colors";
import { useIsFocused } from "@react-navigation/native";
import { palette } from '../constants/Colors'
import { Entypo } from '@expo/vector-icons';
import '../constants/languages/i18n';
import { useTranslation } from 'react-i18next';
import * as SecureStore from 'expo-secure-store';
import data from '../constants/onboarding.json';
import { Button } from "react-native-paper";




async function save(email, password, check) {
  await SecureStore.setItemAsync('onboarding', JSON.stringify({ 'checked': true }));
}

async function getValueFor() {
  let result = await SecureStore.getItemAsync('onboarding');
  console.log(result)
  return JSON.parse(result)
}

/**
 * @class display Home screen
 * @export
 * 
 * @description Map center on user *
 * @return {HTML} 
 */
export default function Home() {
  const [location, setLocation] = useState()
  const [firstStep, setFIrstStep] = useState(0)
  const [firstStepShow, setFIrstStepShow] = useState(false)
  const [Path, setPath] = useState([])
  const [Place, setPlace] = useState([])
  const IsFocused = useIsFocused()
  const [selected, setSelected] = useState()
  const { t, i18n } = useTranslation();

  /**
   * Hook to ask localisation data to user
   * set localisation in SafeAreaProvider.location
   */
  const askPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({})
    setLocation(location)
    SafeAreaProvider.location = location
  }

  /**
   * Get target map from the API
   * Extract the path and the building in Path and Place
   */
  const askMap = async (res) => {
    setPath(res.LongLat)
    if (Place.length == 0) {
      let result = res.Buildings ? await Promise.all(res.Buildings.map(async elem => {
        return await getPlace(elem.id, SafeAreaProvider.Log.token)
      })) : null
      setPlace(result)
      SafeAreaProvider.Place = result
    }
  }

  const askUserInfo = async () => {
    if (!SafeAreaProvider.map) {
      let res = await getMap(SafeAreaProvider.Log.id, SafeAreaProvider.Log.token)
      if (res.LongLat != undefined) {
        askMap(res)
      }
    }
    if (SafeAreaProvider.Place) {
      setPlace(SafeAreaProvider.Place)
    }
    else
      createItinerary()
  }

  /**
   *  Call the lambda to create the map 
  */
  const createItinerary = async () => {
    await getGeneratedPlace(SafeAreaProvider.Log.id, SafeAreaProvider.Log.token).then(async (places) => {
      if (places.hasError)
        return
      setPlace(JSON.parse(places))
      SafeAreaProvider.Place = JSON.parse(places)
      //await getPath(JSON.parse(places), { "y": 3.060966, "x": 50.631305 }, SafeAreaProvider.Log.id)
      //askMap()
    })
  }

  const getNext = () => {
    let index = Place.map(e => e.id).indexOf(selected.id) + 1
    if (index >= Place.length)
      return
    setSelected(Place[index])
  }
  const getPrev = () => {
    let index = Place.map(e => e.id).indexOf(selected.id) - 1
    if (index < 0)
      return
    setSelected(Place[index])
  }

  const endFirstStep = () => {
    setFIrstStepShow(false)
    save()
  }

  useEffect(() => {
    const getFirstStep = async () => {
      let first_step = await getValueFor()
      console.log('first step =>' + firstStep)
      if (firstStep == 0 || firstStep.check == false)
        setFIrstStepShow(true)
    }
    endFirstStep()
    getFirstStep()
    askPosition()
    askUserInfo()
  }, [IsFocused]);

  return (
    <View style={global.container}>

      <MapView style={map}
        loadingIndicatorColor="black"
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: location ? location.coords.latitude : 0,
          longitude: location ? location.coords.longitude : 0,
          latitudeDelta: 0.000,
          longitudeDelta: 0.045,
        }}
        mapType={"standard"}
        showsMyLocationButton={true}
        showsUserLocation={true}
        followsUserLocation={true}
        showsPointsOfInterest={false}
        showsCompass={false}
        toolbarEnabled={false}
        loadingEnabled={true}

      >
        {
          Path.map((elem, index, array) =>
            index != array.length - 1 ?
              <Polyline
                key={index}
                coordinates={
                  [{ longitude: elem.longitude, latitude: elem.latitude },
                  {
                    longitude: array[index + 1].longitude, latitude: array[index + 1].latitude
                  }]}
                strokeColor={Colors('dedalBlueDisable')}
                strokeWidth={5}
              /> : null)
        }
        {
          Place.map((elem, index) => {
            return (
              elem.coordinates ?
                <Marker
                  onPress={e => getPlace(e._dispatchInstances.return.key, SafeAreaProvider.Log.token).then(res => setSelected(res))}
                  key={elem.id}
                  coordinate={{
                    latitude: parseFloat(elem.coordinates.x),
                    longitude: parseFloat(elem.coordinates.y)
                  }}
                  image={require('../assets/pin.png')}
                />
                : null)
          }
          )
        }

      </MapView>

      {firstStepShow ?
        <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: '100%', display: 'flex', alignItems: "center", backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ width: '90%', height: '25%', display: 'flex' }}>
            <TouchableOpacity style={[styles.card, global.row, { backgroundColor: palette.global.dedalBlue }]}>
              <Entypo name="chevron-left" size={24} color="white" onPress={() => setFIrstStep(firstStep == 0 ? firstStep : firstStep - 1)} />
              <View style={{ width: '80%' }}>
                <Text style={[styles.title, { textAlign: 'center' }]}>{data.step[firstStep].title}</Text>
                <Text style={[styles.description, { textAlign: 'center' }]}>{data.step[firstStep].description}</Text>
              </View>
              <Entypo name="chevron-right" size={24} color="white" onPress={() => firstStep == data.step.length - 1 ? endFirstStep(false) : setFIrstStep(firstStep + 1)} />
            </TouchableOpacity>
          </View>
        </View> : null}
      {selected ?
        <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', display: 'flex', alignItems: "center", }}>
          <View style={{ width: '90%', height: '10%' }}>
            <TouchableOpacity style={[styles.card, global.row, { backgroundColor: palette.global.dedalBlue }]}>
              <Entypo name="chevron-left" size={24} color="white" onPress={() => getPrev()} />
              <View style={{ width: '80%' }}>
                <Text style={styles.title}>{selected.name}</Text>
                <Text style={styles.description}>{selected.description}</Text>
              </View>
              <Entypo name="chevron-right" size={24} color="white" onPress={() => getNext()} />
            </TouchableOpacity>
          </View>
        </View> : null}
    </View>
  );
}

const cardColor = '#00B4D8'
const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 25,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: cardColor,
    height: '10%',
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  description: {
    color: '#FFF',
    fontSize: 12
  }
})
