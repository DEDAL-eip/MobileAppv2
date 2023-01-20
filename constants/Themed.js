import {
    Text as DefaultText,
    useColorScheme,
    View as DefaultView,
    TextInput as DefaultTextInput
  } from "react-native";
import { StatusBar as DefaultStatusBar } from 'react-native';
import { Feather as DefaultFeather } from '@expo/vector-icons';

import Colors from "../constants/Colors";
  
export function StatusBar (props) {
    const theme = useColorScheme();
    const content = theme == 'dark' ? 'light-content' : 'dark-content'
    return <DefaultStatusBar barStyle={content} backgroundColor={Colors('Background', theme)}/>;
  
}

export function TextInput (props) {

    const theme = useColorScheme();
    const { style, ...otherProps } = props;

    return <DefaultTextInput
        style={[{ color : Colors('Text', theme) }, style]}
        {...otherProps}
        placeholderTextColor={Colors('Text', theme)}
        selectionColor={Colors('Text', theme)}
        />
}
  
export function Text(props) {
    const theme = useColorScheme();
    const { style, ...otherProps } = props;
    return <DefaultText style={[{ color : Colors('Text', theme) }, style]} {...otherProps} />;
}
 
export function Feather(props) {
    const theme = useColorScheme();
    return <DefaultFeather {...props} color={Colors('Text', theme)} />;
}
            
export function View(props) {
    const theme = useColorScheme();

const { style, ...otherProps } = props;


return <DefaultView style={[{ backgroundColor : Colors('Background', theme) }, style]} {...otherProps} />
}