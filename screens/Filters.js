import { Text, View } from "react-native";
import { Separator } from "../components/Separator";
import FilterButton from '../components/FilterButton';
import getFilters from "../API/Filters";
import { global } from "../style/styles";
import { SafeAreaProvider } from "react-native-safe-area-context";

/**
 * @class
 * 
 * @returns A function that returns a View with filters.
 * @category Screens
 */
export default function Filter() {
  async function CallAPI() {
    const res = await getFilters(SafeAreaProvider.Log.token).then(console.log("RES:", res))
    return res
  }

  const APIfilterz = CallAPI()
  const APIfilters = ['truc', 'troc']
  const filters = []
  const data = []
  
  const assertToContext = (filter, push) => {
    if (push == true)
      data.push(filter);
    else
      data.pop(filter)
    SafeAreaProvider.filters = data
  }

  let y = 0
  for (let i = 0; i < 5; i++){
    filters.push(
      <View key={i} style={global.row}>
        <FilterButton assertToContext={assertToContext} text={APIfilters[y]} />
        <FilterButton assertToContext={assertToContext} text={APIfilters[y + 1]} />
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