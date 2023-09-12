import { useColorScheme, Switch as DefaultSwitch, View, Text } from "react-native";
import Colors from "../constants/Colors";

export const Switch = (({
  title,
  value,
  onValueChange,
  disable,
  style
}) => {
  const theme = useColorScheme();

  return(
    <View style={{ alignItems: 'flex-start' }}>
      <Text style={[{ color: Colors('Text', theme), fontWeight: 'bold'}]}>{title}</Text>
      <DefaultSwitch
        style={style}
        trackColor={{ true: Colors('dedalBlue'), false:Colors('dedalBlueDisable') }}
        thumbColor={Colors('dedalBlue')}
        value={value}
        onValueChange={(e) => onValueChange(e)}
        disable={disable}
      />
    </View>
  )
})
