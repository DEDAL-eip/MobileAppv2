import { View } from "./Themed";
import { StyleSheet} from "react-native";
export const Separator = () => (
    <View style={styles.container}>
      <View style={styles.bar} />
    </View>
);

const styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom : '10%',
    paddingTop : '10%'
  },
  bar : {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginTop : "5%",
    marginBottom : "5%"
  }
})
