import "react-native-gesture-handler";

//import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Main from "./screens/Main";
import { Header } from "./components/Header";
import { useFonts } from "expo-font";

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
        <Header/>
        <Main />
      </SafeAreaProvider>
    );
  }
}
