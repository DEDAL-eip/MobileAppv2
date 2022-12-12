import { Text, View } from "../components/Themed";
import { Separator } from "../components/Separator";
import LocationButton from '../components/LocationButton'
import { global } from "../style/styles";

export default function Location() {
  const APIlocations = [
    ['Le palais des beaux-arts', "Un musée municipal d'art et d'antiquités situé place de la République à Lille, dans la région Hauts-de-France."],
    ['Epitech Lille', "L'école de l'expertise informatique et de l'innovation."],
    ['Place du Général-de-Gaulle', "Un espace public urbain de la commune de Lille dans le département français du Nord en région Hauts-de-France."]
  ]

  return (
    <View style={global.container}>
      <View style={global.titleContainer}>
        <Text style={global.title}>{'LOCATIONS'}</Text>
        <Separator />
      </View>
      <View style={global.middleContainer}>
        {APIlocations.map((item, index) => {
          return <LocationButton name={item[0]} description={item[1]} />;
        })}
      </View>
    </View>
  );
}