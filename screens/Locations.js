import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import { useState, useEffect } from "react";

import { Title } from "../components/Title";
import LocationCard from '../components/LocationCard';
import { TextButton } from "../components/Buttons/TextButton";

import { getLocations } from "../API/Locations";

import { global } from "../style/styles";

import '../constants/languages/i18n';
import { useTranslation } from 'react-i18next';

/**
 * @class display Locations screen
 * @export
 * 
 * @description A function that returns a View with locations.
 * @return {HTML} 
 */
export default function Location() {
  const [Selection, setSelection] = useState("")
  const [Locations, setLocations] = useState([])
  const {t, i18n} = useTranslation();

  const locationsOutItinerary  = [
    ['Le palais des beaux-arts', "Un musée municipal d'art et d'antiquités situé place de la République à Lille, dans la région Hauts-de-France."],
    ['Epitech Lille', "L'école de l'expertise informatique et de l'innovation."],
    ['Le palais des beaux-arts', "Un musée municipal d'art et d'antiquités situé place de la République à Lille, dans la région Hauts-de-France."],
    ['Epitech Lille', "L'école de l'expertise informatique et de l'innovation."],
    ['Le palais des beaux-arts', "Un musée municipal d'art et d'antiquités situé place de la République à Lille, dans la région Hauts-de-France."],
    ['Epitech Lille', "L'école de l'expertise informatique et de l'innovation."],
    ['Place du Général-de-Gaulle', "Un espace public urbain de la commune de Lille dans le département français du Nord en région Hauts-de-France."]
  ]
  const locationsOutFilters = [
    ['Epitech Lille', "L'école de l'expertise informatique et de l'innovation."],
    ['Le palais des beaux-arts', "Un musée municipal d'art et d'antiquités situé place de la République à Lille, dans la région Hauts-de-France."],
    ['Epitech Lille', "L'école de l'expertise informatique et de l'innovation."],
    ['Le palais des beaux-arts', "Un musée municipal d'art et d'antiquités situé place de la République à Lille, dans la région Hauts-de-France."],
    ['Epitech Lille', "L'école de l'expertise informatique et de l'innovation."],
    ['Place du Général-de-Gaulle', "Un espace public urbain de la commune de Lille dans le département français du Nord en région Hauts-de-France."]
  ]
  const locationsInItinerary = []

  /**
   * Hook to push or pop filter from Selection to or from itinerary
   * set locationsInItinerary in SafeAreaProvider.itinerary
   */
  const assertToItinerary = (location) => {
    switch(Selection) {
      case 'Out filters':
        location[0] = "Out filters: " + location[0]
        locationsOutFilters.splice(locationsOutFilters.indexOf(location))
        locationsInItinerary.push(location)
        break
      case 'Out itinerary':
        location[0] = "Out itinerary: " + location[0]
        locationsOutItinerary.splice(locationsOutItinerary.indexOf(location))
        locationsInItinerary.push(location)
        break
      case 'In itinerary':
        locationsInItinerary.splice(locationsInItinerary.indexOf(location))
        break
    }
    SafeAreaProvider.itinerary = locationsInItinerary
  }

  return (
    <View style={global.container}>
      <Title title={t('locations')}></Title>
      <View style={global.middleContainer}>
        <TextButton title={t('in itinerary')} disable={Selection === 'In itinerary'} onPress={() => {
          setSelection('In itinerary')
          setLocations(SafeAreaProvider.itinerary)
          console.log('Debug => ', SafeAreaProvider.itinerary)
        }} />
        <TextButton title={t('out itinerary')} disable={Selection === 'Out itinerary'} onPress={() => {
          setSelection('Out itinerary')
          setLocations(locationsOutItinerary)
        }} />
        <TextButton title={t('out filters')} disable={Selection === 'Out filters'} onPress={() => {
          setSelection('Out filters')
          setLocations(locationsOutFilters)
        }} />
        <ScrollView>
          {Locations.map((item, index) => {
            return <LocationCard key={index} assertToItinerary={assertToItinerary} name={item[0]} description={item[1]} />;
          })}
        </ScrollView>
      </View>
    </View>
  );
}