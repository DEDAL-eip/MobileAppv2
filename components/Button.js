import { Button, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export const GlobalButton = (({title, onPress, disable}) => {
  return (
    <Button disabled={disable} title={title} onPress={onPress} style={styles.global} />
  )
})

export const CloseButton = (({Close}) => {
  return (
    <Button color={Colors.light.White} title='X' onPress={Close} style={styles.close}></Button>
  )
})

const styles = StyleSheet.create({
  global: {
    backgroundColor: Colors.light.dedalBlue,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5
  },
  close: {
    textAlign: "center",
    marginLeft: 5,
    marginRight: 5,
  }
})