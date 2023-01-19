import { View } from "react-native";
import { StyleSheet} from "react-native";
import Colors from "../constants/Colors";
export const Separator = () => (
    <View style={styles.container}>
      <View style={styles.bar} />
    </View>
);

const styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop : '10%'
  },
  bar : {
    flex: 1,
    height: 1,
    backgroundColor: Colors('Text'),
    marginTop : "5%",
  }
})
