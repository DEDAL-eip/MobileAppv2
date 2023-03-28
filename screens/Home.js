import { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import { button, global, map } from "../style/styles";
import * as Location from 'expo-location';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import { getPlace, getInfo, getMap } from "../API/Home";
import Colors from "../constants/Colors";
import { Feather } from '@expo/vector-icons';
import { getInfoUser } from "../API/Filters";
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

  useEffect(() => {

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
      SafeAreaProvider.location = (location)
    }


    /**
     * Get target map from the API
     * Extract the path and the building in Path and Place
     */
    const askMap = async () => {
      let res = await getInfo('test', SafeAreaProvider.Log.token)
      let tmp = JSON.parse(res)

      // NEED TO BE FIX
      if (JSON.parse(res).LongLat != undefined) {
        setPath(JSON.parse(res).LongLat)
        setPlace(tmp.Buildings ? await Promise.all(tmp.Buildings.map(async elem => {
          return await getPlace(elem.id, SafeAreaProvider.Log.token)
        })) : null)
      }
      // NEED TO BE FIX
    }

    const askUserInfo = async () => {
      const res = await getInfoUser(SafeAreaProvider.Log.token, SafeAreaProvider.Log.id)
      if (res.map)
        askMap()
    }

    askPosition()
    askUserInfo()
    //askMap()


  }, [IsFocused]);


  /**
   *  Call the lambda to create the map 
   */
  const parcours = async () => {
    SafeAreaProvider.filters = ['592ecbc0-e50f-4ea1-a142-d034c20e7470']
    await getMap({ "y": 3.060966, "x": 50.631305 }, 'test', SafeAreaProvider.filters)
  }

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
      <Feather style={button.logout} name={"log-out"} size={24} onPress={() => SafeAreaProvider.Loged(false)} color={Colors('dedalBlue')} />
      <Feather style={[button.logout, { top: 10, left: 40 }]} name={"loader"} size={24} onPress={() => parcours()} color={Colors('dedalBlue')} />
    </View>
  );
}