import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import { useState } from "react";

import { Separator } from "../components/Separator";
import LocationCard from '../components/LocationCard';
import { GlobalButton } from "../components/Button";

import { getLocations } from "../API/Locations";

import { global } from "../style/styles";

export default function Location() {
  const [Locations, setLocations] = useState([])
  const data = []

  function fetchLocationsInItinerary() {
    console.log("TROC", SafeAreaProvider.itinerary)
    setLocations(SafeAreaProvider.itinerary)
  }

  function fetchLocationsOutItinerary() {
    setLocations([
      ['Le palais des beaux-arts', "Un musée municipal d'art et d'antiquités situé place de la République à Lille, dans la région Hauts-de-France."],
      ['Epitech Lille', "L'école de l'expertise informatique et de l'innovation."],
      ['Le palais des beaux-arts', "Un musée municipal d'art et d'antiquités situé place de la République à Lille, dans la région Hauts-de-France."],
      ['Epitech Lille', "L'école de l'expertise informatique et de l'innovation."],
      ['Le palais des beaux-arts', "Un musée municipal d'art et d'antiquités situé place de la République à Lille, dans la région Hauts-de-France."],
      ['Epitech Lille', "L'école de l'expertise informatique et de l'innovation."],
      ['Place du Général-de-Gaulle', "Un espace public urbain de la commune de Lille dans le département français du Nord en région Hauts-de-France."]
    ])
  }

  function fetchLocationsOutFilters() {
    setLocations([
      ['Epitech Lille', "L'école de l'expertise informatique et de l'innovation."],
      ['Le palais des beaux-arts', "Un musée municipal d'art et d'antiquités situé place de la République à Lille, dans la région Hauts-de-France."],
      ['Epitech Lille', "L'école de l'expertise informatique et de l'innovation."],
      ['Le palais des beaux-arts', "Un musée municipal d'art et d'antiquités situé place de la République à Lille, dans la région Hauts-de-France."],
      ['Epitech Lille', "L'école de l'expertise informatique et de l'innovation."],
      ['Place du Général-de-Gaulle', "Un espace public urbain de la commune de Lille dans le département français du Nord en région Hauts-de-France."]
    ])
  }

  const assertToItinerary = (location, push) => {
    if (push == true)
      data.push(location);
    else
      data.pop(location);
    SafeAreaProvider.itinerary = data
    console.log("SAFEARE ITINERARY AFTER ASSERT", SafeAreaProvider.itinerary, ", push:", push, ", location:", location)
  }

  return (
    <View style={global.container}>
      <View style={global.titleContainer}>
        <Text style={global.title}>{'LOCATIONS'}</Text>
        <Separator />
      </View>
      <View style={global.middleContainer}>
        <GlobalButton title='In itinerary' onPress={() => fetchLocationsInItinerary()} />
        <GlobalButton title='Out itinerary' onPress={() => fetchLocationsOutItinerary()} />
        <GlobalButton title='Out filters' onPress={() => fetchLocationsOutFilters()} />
        <ScrollView>
          {Locations.map((item, index) => {
            return <LocationCard key={index} assertToItinerary={assertToItinerary} name={item[0]} description={item[1]} />;
          })}
        </ScrollView>
      </View>
    </View>
  );
}