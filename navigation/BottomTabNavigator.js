// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import Homes from "../screens/Home";
import Setting from "../screens/Settings";
import Filter from "../screens/Filters";
import Location from "../screens/Locations";
import Login from "../screens/Login";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Login"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Filters"
        component={FiltersNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
      name="Location"
      component={LocationNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <TabBarIcon name="ios-code" color={color} />
        ),
      }}
    />
    <BottomTab.Screen
        name="Settings"
        component={SettingNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
    
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeNAV"
        component={Homes}
        options={{ headerTitle: "Home" }}
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
        options={{ headerTitle: "Settings" }}
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
        options={{ headerTitle: "Filters" }}
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
        options={{ headerTitle: "Location" }}
      />
    </LocationStack.Navigator>
  );
}

function LoginNavigator() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="LoginNAV"
        component={Login}
        options={{ headerTitle: "Login" }}
      />
    </LoginStack.Navigator>
  );
}