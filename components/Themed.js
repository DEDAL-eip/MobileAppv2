// Learn more about Light and Dark modes:
// https://docs.expo.dev/guides/color-schemes/
import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
} from "react-native";

import Colors from "../constants/Colors";

export function useThemeColor(colorName) {
  const theme = useColorScheme();
  return(Colors.light[colorName])
}

export function Text(props) {
  const { style, ...otherProps } = props;
  const color = useThemeColor(otherProps.Type ? otherProps.Type : "Black");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor(otherProps.Type ? otherProps.Type : "White")

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
