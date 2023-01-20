import { light } from "@mui/material/styles/createPalette";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default ((type, theme) => {
  if (theme) {
    return(palette[theme][type] ? palette[theme][type]  : palette.undefined)
  }
  return(palette.global[type] ? palette.global[type]  : palette.undefined)
})

export const palette = {
  undefined : '#592E83',
  light: {
    Background : '#FFFFFF',
    Text : '#1D1D1D',
  },
  dark: {
    Background : '#1D1D1D',
    Text : '#FFFFFF',
  },
  global : {
    dedalBlue : '#294F87',
    dedalBlueDisable : '#70819c',
    ValidateGreen : '#03C923',
    ErrorRed : '#FF0000',
    White : '#FFFFFF',
    Black : '#1D1D1D',
    
  }
};
