import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import FilterButton from '../components/FilterButton'

export default function Filter() {
  const APIfilters = ['pop', 'art', 'history']

  const filters = []

  let y = 0
  for (let i = 0; i < 5; i++){
      filters.push(
          <View key={i} style={styles.row}>
              <FilterButton text={APIfilters[y]} />
              <FilterButton text={APIfilters[y + 1]} />
          </View>
      )
      y = y + 2
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{new Date().toLocaleString()}</Text>
        <Text style={styles.title}>FILTER</Text>              
        { filters }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#0096C7'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  wrapper:
  {
      paddingTop: 40,
      paddingHorizontal: 20
  },
  card: {
      backgroundColor: '#FFF',
      padding: 25,
      borderRadius: 50,
      marginTop: 25
  },
  row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
  }
});
