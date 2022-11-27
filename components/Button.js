import { Button, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
export const GlobalButton = (({title, onPress, disable}) => {
    return(
      <Button color={Colors.light.dedalBlue} disabled={disable} title={title} onPress={onPress}></Button>
    )
})

export const CloseButton = ({Close}) => {
  return (
    <Button color={Colors.light.White} title='X' onPress={Close} style={styles.Close}></Button>
  )
}

const styles = StyleSheet.create({
  close: {
    textAlign: "center",
    marginLeft: 5,
    marginRight: 5,
  }
})