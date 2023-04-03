import Ionicons from "@expo/vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";
import { Feather } from '@expo/vector-icons';

import Home from "../screens/Home";
import Setting from "../screens/Settings";
import Filter from "../screens/Filters";
import Location from "../screens/Locations";
import Colors from "../constants/Colors";

const BottomTab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"

      activeColor={Colors('dedalBlue')}
      inactiveColor={Colors('dedalBlueDisable')}
      barStyle={{
        backgroundColor: Colors('Background', colorScheme)
      }}
    >
      <BottomTab.Screen
        name="Filters"
        component={FiltersNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name='filter' color={color} size={26} />
          )
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name='map' color={color} size={26} />
          )
        }}
      />
      <BottomTab.Screen
        name="Location"
        component={LocationNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name='list' color={color} size={26} />
          )
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name='settings' color={color} size={26} />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

const HomeStack = createStackNavigator();
function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeNAV"
        component={Home}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();
function SettingNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsNAV"
        component={Setting}
        options={{ headerShown: false }}
      />
    </SettingsStack.Navigator>
  );
}

const FiltersStack = createStackNavigator();
function FiltersNavigator() {
  return (
    <FiltersStack.Navigator>
      <FiltersStack.Screen
        name="FiltersNAV"
        component={Filter}
        options={{ headerShown: false }}
      />
    </FiltersStack.Navigator>
  );
}

const LocationStack = createStackNavigator();
function LocationNavigator() {
  return (
    <LocationStack.Navigator>
      <LocationStack.Screen
        name="LocationNAV"
        component={Location}
        options={{ headerShown: false }}
      />
    </LocationStack.Navigator>
  );
}