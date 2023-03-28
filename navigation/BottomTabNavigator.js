// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";
import { Feather } from '@expo/vector-icons';

import Home from "../screens/Home";
import Setting from "../screens/Settings";
import Filter from "../screens/Filters";
import Location from "../screens/Locations";
import Colors from "../constants/Colors";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'map'
        } else if (route.name === 'Settings') {
          iconName = 'settings';
        } else if (route.name === 'Location') {
          iconName = 'list';
        } else if (route.name === 'Filters') {
          iconName = 'filter';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: Colors('dedalBlue'),
      tabBarInactiveTintColor: Colors('dedalBlueDisable'),
      tabBarActiveBackgroundColor: Colors('Background', colorScheme),
      tabBarInactiveBackgroundColor: Colors('Background', colorScheme),
    })}
      >

      <BottomTab.Screen
        name="Filters"
        component={FiltersNavigator}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
      />
      <BottomTab.Screen
      name="Location"
      component={LocationNavigator}
    />
    <BottomTab.Screen
        name="Settings"
        component={SettingNavigator}
      />
    </BottomTab.Navigator>
    
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  //<Feather style={{marginLeft : 10}}name={hide ? "eye" : "eye-off"} size={24} onPress={() => setHide(!hide)} color="black" />
  return <Feather size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
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