import { Text, View } from "../constants/Themed";
import { Separator } from "../components/Separator";
import FilterButton from '../components/FilterButton';
import getFilters from "../API/Filters";
import { global } from "../style/styles";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Title } from "../components/Title";

/**
 * @class display Filters screen
 * @export
 * 
 * @description A function that returns a View with filters.
 * @return {HTML} 
 */
export default function Filter() {
  const [APIfilterz, setFilters] = useState([])
  const data = []
  
  useEffect(() => {
    /**
     * Hook to get filter data to user
     * set filters
     */
    const getFilter = async () => {
      const res = await getFilters(SafeAreaProvider.Log.token)
      setFilters(res)
    }

    getFilter()
  },[])

  /**
   * Hook to return repeatedly Views with FilterButton from filters fetch from API
   */
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

  /**
   * Hook to push filter to data
   * set data in SafeAreaProvider.filters
   */
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