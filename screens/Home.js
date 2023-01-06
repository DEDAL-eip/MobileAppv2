import { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GlobalButton } from "../components/Button";
import { View } from "react-native";
import { global, map } from "../style/styles";
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps'
import { getPlace, getFilter, getMap } from "../API/Home";

export default function Home() {
  const [location, setLocation] = useState()
  const [point, setPoint] = useState([])
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
    })();
  }, []);

  const place = async (place) => {
    let first = await getPlace(place)
    let second = await getPlace("a32e2657-3776-45e8-8fe5-e6ead2aceb8a")
    console.log(first)
    setPoint([...point, first, second])
  }   

  const filter = async () => {
    const token = SafeAreaProvider.Log.token
    let res = await getFilter(token)
    console.log('res => ', res)
  }

  const parcours = async () => {
    SafeAreaProvider.filters = ['7f400994-a5fd-44f6-a8ca-aa173a81b980']
    let res = await getMap({x: 3.155126, y: 50.711916}, 'test', SafeAreaProvider.filters)
    console.log('res => ', res)
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
                //mapType={"standard"}
                showsMyLocationButton={true}
                showsUserLocation={true}
                followsUserLocation={true}
                showsPointsOfInterest={false}
                
            >
              {point.map((elem, index) =>
                    elem.coordinates ? <Marker
                    key={index}
                    coordinate={{
                      latitude: elem.coordinates.y,
                      longitude: elem.coordinates.x
                    }}
                    title={elem.name}
                    description={elem.description}
                    image={require('../assets/pin.png')}
                    onPress={() => {setTarget(elem)}}
                  /> : null)}
              {
                target ?  <Polyline
                coordinates={
                  [{longitude: location.coords.longitude,latitude: location.coords.latitude},
                  {longitude: target.coordinates.x,latitude: target.coordinates.y
                  }]
                } //specify our coordinates
                strokeColor={"#000"}
                strokeWidth={3}
                lineDashPattern={[1]}
              /> : null
              }
          </MapView>
        <View style={global.bottomContainer}>
          <GlobalButton title='Deconnection' onPress={() => SafeAreaProvider.Loged(false)}></GlobalButton>
          <GlobalButton title='Place' onPress={() => place("6838b6d7-e238-43a0-bfe7-8f09d2179454")}></GlobalButton>
          <GlobalButton title='Filter' onPress={() => filter()}></GlobalButton>
          <GlobalButton title='Parcours' onPress={() => parcours()}></GlobalButton>
        </View>
    </View>
  );
}