import { TouchableOpacity, Text } from "react-native";
import { button, color } from "../style/styles";

export const GlobalButton = (({title, onPress, disable, style}) => {
  return(
    <TouchableOpacity style={style, [disable ? button.disable : button.container]} onPress={() => onPress()} disabled={disable}>
      <Text style={color.white}>{title}</Text>
    </TouchableOpacity>
  )
})

export const CloseButton = ({Close}) => {
  return (
    <TouchableOpacity style={button.close} onPress={() => Close()}>
      <Text style={color.black}>X</Text>
    </TouchableOpacity>
  )
}