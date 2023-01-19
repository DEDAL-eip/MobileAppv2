import { SafeAreaProvider } from "react-native-safe-area-context";


export default ((type) => {
  let schem = SafeAreaProvider.mode ? SafeAreaProvider.mode : 'dark'
  console.log("here => ", SafeAreaProvider.mode, schem)
  return(palette[schem][type] ? palette[schem][type]  : palette.undefined)
})

export const palette = {
  undefined : '#592E83',
  light: {
    dedalBlue : '#294F87',
    dedalBlueDisable : '#70819c',
    ValidateGreen : '#03C923',
    ErrorRed : '#FF0000',
    White : '#FFFFFF',
    Background : '#FFFFFF',
    Text : '#1D1D1D',
    Black : '#1D1D1D',
  },
  dark: {
    dedalBlue : '#294F87',
    dedalBlueDisable : '#70819c',
    ValidateGreen : '#03C923',
    ErrorRed : '#FF0000',
    Background : '#1D1D1D',
    Text : '#FFFFFF',
    White : '#FFFFFF',
    Black : '#1D1D1D',
  },
};
