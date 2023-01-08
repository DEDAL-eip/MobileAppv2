import { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GlobalButton } from "../components/Button";
import { TextInput, View } from "react-native";
import { button, global, map } from "../style/styles";
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps'
import { getPlace, getInfo } from "../API/Home";
import Colors from "../constants/Colors";
import { Feather } from '@expo/vector-icons';

export default function Home() {
  const [location, setLocation] = useState()
  const [Path, setPath] = useState([])
  const [Place, setPlace] = useState([])
  const [target, setTarget] = useState()

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location)
      SafeAreaProvider.location = location

      await Parcours()      
    })();
  }, []);

  // const parcours = async () => {
  //   SafeAreaProvider.filters = ['592ecbc0-e50f-4ea1-a142-d034c20e7470']
  //   let res = await getMap({"x": 3.060966, "y": 50.631305}, 'test', SafeAreaProvider.filters)
  // } 

  const Parcours = async () => {
    let res = await getInfo('test')
    setPath(JSON.parse(res).LongLat)
    JSON.parse(res).Buildings.forEach(async (elem) => await getPlaceInfo(elem.id))
  }

  const getPlaceInfo = async (id) => {
    let res = await getPlace(id)
    setPlace([...Place, res])
    return
  }


  
  return (
    <View style={global.container}>
        <MapView style={map}
                region={{
                    latitude: location ? location.coords.latitude : 0, 
                    longitude: location ? location.coords.longitude : 0,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.045,
                }}
                mapType={"standard"}
                showsMyLocationButton={true}
                showsUserLocation={true}
                followsUserLocation={true}
                showsPointsOfInterest={false}
                
            >
              {
              Path.map((elem, index, array) =>
                index != array.length-1 ?
                    <Polyline
                    key={index}
                  coordinates={
                  [{longitude: elem.longitude,latitude: elem.latitude},
                  {longitude: array[index+1].longitude,latitude: array[index+1].latitude
                  }]}
                  strokeColor={Colors('dedalBlue')}
                  strokeWidth={5}
                  /> : null)
              }
              { 
              Place.map((elem, index) =>
                <Marker
                  key={index}
                  coordinate={{
                    latitude: elem.coordinates.x,
                    longitude: elem.coordinates.y
                  }}
                  title={elem.name}
                  description={elem.description}
                  image={require('../assets/pin.png')}
                  />
              )
              }
          </MapView>
        <View style={button.logout}>
            <Feather style={{marginLeft : 10}}name={"log-out"} size={24} onPress={() => SafeAreaProvider.Loged(false)} color="black" />
        </View>
    </View>
  );
}