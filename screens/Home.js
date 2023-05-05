import { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import { global, map } from "../style/styles";
import * as Location from 'expo-location';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import { getPlace, getMap, getPath, getGeneratedPlace } from "../API/Home";
import Colors from "../constants/Colors";
import { getInfoUser } from "../API/Filters";
import { TextButton } from "../components/buttons/TextButton";
import { useIsFocused } from "@react-navigation/native";

import '../constants/languages/i18n';
import { useTranslation } from 'react-i18next';

/**
 * @class display Home screen
 * @export
 * 
 * @description Map center on user *
 * @return {HTML} 
 */
export default function Home() {
  const [location, setLocation] = useState()
  const [Path, setPath] = useState([])
  const [Place, setPlace] = useState([])
  const IsFocused = useIsFocused()
  const {t, i18n} = useTranslation();

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
  const askMap = async () => {
    console.log('Place =>',Place)
    let res = await getMap(SafeAreaProvider.Log.id, SafeAreaProvider.Log.token)
    let tmp = JSON.parse(res)
    console.log(tmp)
    if (JSON.parse(res).LongLat != undefined) {
      setPath(JSON.parse(res).LongLat)
      setPlace(tmp.Buildings ? await Promise.all(tmp.Buildings.map(async elem => {
        return await getPlace(elem.id, SafeAreaProvider.Log.token)
      })) : null)
    }
  }

  const askUserInfo = async () => {
    console.log('info => ',SafeAreaProvider.Log, SafeAreaProvider.path, SafeAreaProvider.place)
    return

    if (SafeAreaProvider.path == undefined)
      //const path = await getPath(JSON.parse(generatedPlaces), { "y": 3.060966, "x": 50.631305 }, 'ea74d746-43d9-4309-a63a-925bafb93402')
    if (SafeAreaProvider.Log.lastInfo.map)
      askMap()
    else if (SafeAreaProvider.Log.lastInfo)
      console.log(res.filters)
  }

  /**
   *  Call the lambda to create the map 
  */
  const createItinerary = async () => {

   
    const generatedPlaces = await getGeneratedPlace('ea74d746-43d9-4309-a63a-925bafb93402', SafeAreaProvider.Log.token)
    console.log('generatedPlaces => ', generatedPlaces)
    let path = await getPath(JSON.parse(generatedPlaces), { "y": 3.060966, "x": 50.631305 }, 'ea74d746-43d9-4309-a63a-925bafb93402')
    let map = await getMap('-ea74d746-43d9-4309-a63a-925bafb93402', SafeAreaProvider.Log.token)
    console.log('API =>', path, map)
  }
  
    useEffect(() => {
      askPosition()
      askUserInfo()
    }, [IsFocused]);

  return (
    <View style={global.container}>
      <MapView style={map}
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
          Place ? Place.map((elem, index) => {
            return (
              elem.coordinates ?
                <Marker
                  key={index}
                  coordinate={{
                    latitude: parseFloat(elem.coordinates.x),
                    longitude: parseFloat(elem.coordinates.y)
                  }}
                  title={elem.name}
                  description={elem.description}
                  image={require('../assets/pin.png')}
                />
                : null)
          }
          ) : null
        }
      </MapView>
      <TextButton style={{ bottom: 60, left: 30 }} title={'Generate itinerary!'} onPress={() => askMap()} />
    </View>
  );
}