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
          Login: {
            screens: {
              Login: "Login",
            },
          },
          Settings: {
            screens: {
              SettingsScreen: "Settings",
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
          Locations: {
            screens: {
              SettingsScreen: "Login",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
