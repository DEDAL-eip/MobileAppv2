import { TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { Text } from "./Themed";
import { ButtonS } from "../style/Button";
export const GlobalButton = (({title, onPress}) => {
    return(
        <TouchableOpacity style={ButtonS.Basic} onPress={onPress}>
            <Text style={styles.text} adjustsFontSizeToFit={true} numberOfLines={1}>{title}</Text>
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea"
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
});
