import Ionicons from "@expo/vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";
import { Feather } from '@expo/vector-icons';

import Home from "../screens/Home";
import Profile from "../screens/Profile";
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
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name='user' color={color} size={26} />
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

const ProfileStack = createStackNavigator();
function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileNAV"
        component={Profile}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
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