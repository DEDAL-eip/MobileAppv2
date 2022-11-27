import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "./Themed";
import { button } from "../style/styles";
export const GlobalButton = (({title, onPress, disable}) => {
    return(
      <TouchableOpacity style={button.container} onPress={() => onPress()}>
        <Text Type={"White"}>{title}</Text>
      </TouchableOpacity>
      )
})

export const CloseButton = ({Close}) => {
  return (
    <TouchableOpacity style={button.close} onPress={() => Close()}>
      <Text Type={"black"}>X</Text>
  </TouchableOpacity>
  )
}