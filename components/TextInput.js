import { TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export const LoginTextInput = (({disabled, placeholder}) => {
    return(
      <TextInput color={Colors.light.dedalBlue} disabled={disabled} placeholder={placeholder} style={styles.textInput} />
    )
})

const styles = StyleSheet.create({
  textInput : {
    borderWidth: 2.5,
    borderColor: 'black',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5
  }
})