import "react-native-gesture-handler";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Main from "./screens/Main";
import { useFonts } from "expo-font";
import { global } from "./style/styles";
import { StatusBar } from './constants/Themed';
export default function App() {
  const isLoadingComplete = useLoadedAssets();

  const [fontsLoaded] = useFonts({
    'Main': require('./assets/font/static/Raleway-Light.ttf'),
    'Bold': require('./assets/font/static/Raleway-Black.ttf'),
  });
  if (!isLoadingComplete) 
    return null;
  else {
    return (
      <SafeAreaProvider>
        <StatusBar />
            <Main colorScheme />
      </SafeAreaProvider>
    );
  }
}
