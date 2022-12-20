import { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GlobalButton } from "../components/Button";
import { View } from "../components/Themed";
import { global, map } from "../style/styles";
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps'
import { getPlace } from "../API/Home";
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

  const filter = async (place) => {
    let res = await getPlace(place)
    setPoint([...point, res])
    console.log(res)
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
              {point.map(elem => 
                 elem.coordinates ? <Marker
                    coordinate={{
                      latitude: 37.8025259,
                      longitude: -122.4351431
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
               <Polyline
                coordinates={[
                  { latitude: 37.8025259, longitude: -122.4351431 },
                  { latitude: 37.7896386, longitude: -122.421646 },
                  { latitude: 37.7665248, longitude: -122.4161628 },
                  { latitude: 37.7734153, longitude: -122.4577787 },
                  { latitude: 37.7948605, longitude: -122.4596065 },
                  { latitude: 37.8025259, longitude: -122.4351431 }
                ]}
             //specify our coordinates
                strokeColor={"#000"}
                strokeWidth={3}
                lineDashPattern={[1]}
              />
          </MapView>
        <GlobalButton title='Deconnection' onPress={() => SafeAreaProvider.Loged(false)}></GlobalButton>
        <GlobalButton title='Filter1' onPress={() => filter("6838b6d7-e238-43a0-bfe7-8f09d2179454")}></GlobalButton>
        <GlobalButton title='Filter2' onPress={() => filter("a32e2657-3776-45e8-8fe5-e6ead2aceb8a")}></GlobalButton>
        <GlobalButton title='Reset' onPress={() => setPoint([])}></GlobalButton>
    </View>
  );
}