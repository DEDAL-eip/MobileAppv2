/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              Home: "Home",
            },
          },
          Profile: {
            screens: {
              SettingsScreen: "Profile",
            },
          },
          Filter: {
            screens: {
              SettingsScreen: "Filter",
            },
          },
          Locations: {
            screens: {
              SettingsScreen: "Locations",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
