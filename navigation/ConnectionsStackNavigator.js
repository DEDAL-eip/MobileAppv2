import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LinkingConfiguration from "./LinkingConfiguration";

import { ConnectionsScreen } from "../screens/connections/ConnectionsScreen";
import { SignUpScreen } from "../screens/connections/SignUpScreen";

const Stack = createStackNavigator();

export default function ConnectionsStackNavigator() {
  return (
    <NavigationContainer
      initialRouteName="Connections"
      linking={LinkingConfiguration}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Connections" component={ConnectionsScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Google" component={ConnectionsScreen} />
        <Stack.Screen name="LogIn" component={ConnectionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
