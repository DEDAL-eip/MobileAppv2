import { TouchableOpacity, Text } from "react-native";
import { button, color } from "../../style/styles";

export const CloseButton = ({Close}) => {
  return (
    <TouchableOpacity style={button.close} onPress={() => Close()}>
      <Text style={color.text}>X</Text>
    </TouchableOpacity>
  )
}