import "react-native-gesture-handler";

//import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Main from "./screens/Main";
import { useFonts } from "expo-font";
import { global } from "./style/styles";
export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const [fontsLoaded] = useFonts({
    'Main': require('./assets/font/static/Raleway-Light.ttf'),
    'Bold': require('./assets/font/static/Raleway-Black.ttf'),
  });
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={global.container}>
            <Main />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}
