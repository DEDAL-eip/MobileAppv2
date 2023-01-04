import { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GlobalButton } from "../components/Button";
import { Text, View } from "../components/Themed";
import { Title } from "../components/Title";
import { global, map } from "../style/styles";
import * as Location from 'expo-location';
import MapView, { Marker, Callout } from 'react-native-maps'

export default function Home() {
  const [location, setLocation] = useState()
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
              <Marker
                    coordinate={{
                        latitude: 50.63515978723152,
                        longitude: 3.061918957725544
                      }}
                    title="Test"
                    description="Test Desc"
                    image={require('../assets/pin.png')}
                
                >

                <Callout onPress={() => { console.log()}}/>
                </Marker>
          </MapView>
        <GlobalButton title='Deconnection' onPress={() => SafeAreaProvider.Loged(false)}></GlobalButton>
    </View>
  );
}