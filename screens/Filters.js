import { Text, View } from "../constants/Themed";
import { Separator } from "../components/Separator";
import FilterButton from '../components/FilterButton';
import getFilters from "../API/Filters";
import { global } from "../style/styles";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Title } from "../components/Title";

/**
 * @class
 * 
 * @returns A function that returns a View with filters.
 * @category Screens
 */
export default function Filter() {

  const [APIfilterz, setFilters] = useState([])
  const data = []
  
  useEffect(() => {
    const getFilter = async () => {
      const res = await getFilters(SafeAreaProvider.Log.token)
      setFilters(res)
    }
    getFilter()
  },[])


  const buildDisplayFilters = () => {
    return APIfilterz.map((filtre, index, array) => {
      if (!(index % 2)) {
      return (
            <View key={index} style={global.row}>
              <FilterButton assertToContext={assertToContext} text={array[index].name} />
              <FilterButton assertToContext={assertToContext} text={array[index+1] ? array[index+1].name : null} />
            </View>
          )
        }
      })
  }

  const assertToContext = (filter, push) => {
    if (push == true)
      data.push(filter);
    else
      data.pop(filter)
    SafeAreaProvider.filters = data
  }

  return (
    <View style={global.container}>
      <Title title={'Filtres'}/>
      <View style={global.middleContainer}>
        { buildDisplayFilters() }
      </View>
    </View>
  );
}