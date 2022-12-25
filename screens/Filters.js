import { Text, View } from "../components/Themed";
import { Separator } from "../components/Separator";
import FilterButton from '../components/FilterButton';
import getFilters from "../API/Filters";
import { global } from "../style/styles";

/**
 * @class
 * 
 * @returns A function that returns a View with filters.
 * @category Screens
 */
export default function Filter() {
  async function CallAPI() {
    const res = await getFilters()
    return res
  }

  const APIfilters = CallAPI()

  const filters = []

  // REMOVE WHEN JULIEN FIX API: console.log('APIFILTER: ', APIfilters)

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