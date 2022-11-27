import "react-native-gesture-handler";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Appearance } from 'react-native';
import Navigation from "../navigation";
import { useColorScheme } from "react-native";
import Login from "../screens/Login";
import { useState } from "react";

export default function Main() {
    const colorScheme = useColorScheme();
    const [IsLoged, setLoged] = useState(false)
    SafeAreaProvider.Loged = setLoged
    if (!IsLoged)
        return (
        <Login/>
        );
    else {
        return (
        <Navigation colorScheme={colorScheme} />
        )
    }
  }

