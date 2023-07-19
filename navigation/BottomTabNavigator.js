import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";
import { Feather } from '@expo/vector-icons';

import Home from "../screens/Home";

import Profile from "../screens/profile/Profile";
import Settings from "../screens/profile/Settings";
import Account from "../screens/profile/Account";

import Filter from "../screens/Filters";
import Location from "../screens/Locations";

import Colors from "../constants/Colors";
import '../constants/languages/i18n';
import { useTranslation } from 'react-i18next';
import LocationsSearch from "../screens/profile/LocationsSearch";

const BottomTab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const {t, i18n} = useTranslation();

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
        name={t('filters')}
        component={FiltersNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name='filter' color={color} size={26} />
          )
        }}
      />
      <BottomTab.Screen
        name={t('home')}
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name='map' color={color} size={26} />
          )
        }}
      />
      <BottomTab.Screen
        name={t('locations')}
        component={LocationNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name='list' color={color} size={26} />
          )
        }}
      />
      <BottomTab.Screen
        name={t('profile')}
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
      <ProfileStack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerStyle: {
            backgroundColor: '#294F87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen
        name="Account"
        component={Account}
        options={{
          headerStyle: {
            backgroundColor: '#294F87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen
        name="Locations Search"
        component={LocationsSearch}
        options={{
          headerStyle: {
            backgroundColor: '#294F87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
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