import { SafeAreaProvider } from "react-native-safe-area-context";
import languages from '../constants/languages/all.js';

function translate(text) {
    console.log("ENTER THE TRANSLATE FUNCTION")
    if (!SafeAreaProvider.language)
        SafeAreaProvider.language = 'french'
    const { language } = SafeAreaProvider.language;

    console.log("Object.keys(languages)", Object.keys(languages))
    console.log("Object.keys(languages).includes(language)", Object.keys(languages).includes(language))
    if (Object.keys(languages).includes(language)) {
        return languages[language][text] || text;
    }

    return text;
};

export default translate;