import { Text, View } from "../components/Themed";
import { Separator } from "../components/Separator";
import FilterButton from '../components/FilterButton'
import { global } from "../style/styles";

export default function Filter() {
  const APIfilters = ['pop', 'art', 'history']

  const filters = []

  let y = 0
  for (let i = 0; i < 5; i++){
    filters.push(
      <View key={i} style={global.row}>
        <FilterButton text={APIfilters[y]} />
        <FilterButton text={APIfilters[y + 1]} />
      </View>
    )
    y = y + 2
  }

  return (
    <View style={global.container}>
      <View style={global.titleContainer}>
        <Text style={global.title}>{'FILTER'}</Text>
        <Separator />
      </View>
      <View style={global.middleContainer}>
        { filters }
      </View>
    </View>
  );
}