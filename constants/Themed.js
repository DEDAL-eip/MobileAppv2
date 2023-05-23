import {
    Text as DefaultText,
    useColorScheme,
    View as DefaultView,
    TextInput as DefaultTextInput,
    Modal as DefaultModal,
    ActivityIndicator as DefaultActivityIndicator
} from "react-native";
import { StatusBar as DefaultStatusBar } from 'react-native';
import { Feather as DefaultFeather } from '@expo/vector-icons';

import Colors from "../constants/Colors";
import { separator } from "../style/styles";

export function StatusBar(props) {
    const theme = useColorScheme();
    const content = theme == 'dark' ? 'light' : 'dark'
    return <DefaultStatusBar barStyle={content} backgroundColor={Colors('Background', theme)} />;

}

export function TextInput(props) {
    const theme = useColorScheme();
    const { style, ...otherProps } = props;

    return <DefaultTextInput
        style={[{ color: Colors('Text', theme) }, style]}
        {...otherProps}
        placeholderTextColor={Colors('Text', theme)}
        selectionColor={Colors('Text', theme)}
    />
}

export function Text(props) {
    const theme = useColorScheme();
    const { style, ...otherProps } = props;
    return <DefaultText style={[{ color: Colors('Text', theme) }, style]} {...otherProps} />;
}

export function Feather(props) {
    const theme = useColorScheme();
    return <DefaultFeather {...props} color={Colors('Text', theme)} />;
}

export function View(props) {
    const theme = useColorScheme();

    const { style, ...otherProps } = props;

    return <DefaultView style={[{ backgroundColor: Colors('Background', theme) }, style]} {...otherProps} />
}

export const Separator = () => {
    const theme = useColorScheme()

    return (
        <View style={separator.container}>
            <View style={[{ backgroundColor: Colors('Text', theme) }, { ...separator.bar }]} />
        </View>
    )
};

export const Modal = (props) => {
    const theme = useColorScheme();
    const { style, ...otherProps } = props;

    return <DefaultModal style={[{ backgroundColor: Colors('Background', theme) }, style]} {...otherProps}/>
}

export const ActivityIndicator = (props) => {
    const { style, ...otherProps } = props;

    return <DefaultActivityIndicator size="large" style={style} {...otherProps} color={Colors('dedalBlue')} {...otherProps}/>
}