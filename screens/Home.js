import { SafeAreaProvider } from "react-native-safe-area-context";
import { GlobalButton } from "../components/Button";
import { View } from "../components/Themed";
import { Title } from "../components/Title";
import { global } from "../style/styles";

export default function Home() {
  return (
    <View style={global.container}>
      <Title title='HOME'></Title>
      <View style={global.middleContainer}>
      
      </View>
      <View style={global.bottomContainer}>
        <GlobalButton title='Deconnection' onPress={() => SafeAreaProvider.Loged(false)}></GlobalButton>
      </View>
    </View>
  );
}