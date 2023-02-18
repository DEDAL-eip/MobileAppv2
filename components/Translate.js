import { SafeAreaProvider } from "react-native-safe-area-context";
import languages from '../constants/languages/all.js';

function translate(text) {
    if (!SafeAreaProvider.language)
        SafeAreaProvider.language = 'french'
    const { language } = SafeAreaProvider.language;

    if (Object.keys(languages).includes(language)) {
        return languages[language][text] || text;
    }

    return text;
};

export default translate;