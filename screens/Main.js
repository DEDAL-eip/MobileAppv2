import "react-native-gesture-handler";

import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "../navigation";
import { useColorScheme } from "react-native";
import Login from "../screens/Login";
import { useState } from "react";

/**
 * @class display Main screen
 * @export
 * 
 * @description A function that returns the Login or Navigation screen.
 * @return {HTML} 
 */
export default function Main() {
    const [IsLoged, setLoged] = useState(false)
    const colorScheme = useColorScheme()
    SafeAreaProvider.Loged = setLoged
    SafeAreaProvider.mode = colorScheme


    if (!IsLoged)
        return (
            <Login/>
        );
    else {
        return (
            <Navigation/>
        )
    }
  }

