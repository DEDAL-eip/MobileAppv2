import { TouchableOpacity, Text } from "react-native";
import { button, color } from "../../style/styles";

export function TextButton({title, onPress, disable, style}) {
  return(
    <TouchableOpacity style={[style, disable ? button.disable : button.container]} onPress={() => onPress()} disabled={disable}>
      <Text style={color.white}>{title}</Text>
    </TouchableOpacity>
  )
}