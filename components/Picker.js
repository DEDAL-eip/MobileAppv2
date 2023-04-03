import { useColorScheme, View } from "react-native";
import { Picker as DefaultPicker } from '@react-native-picker/picker';

import Colors from "../constants/Colors";


export function MyPicker(props) {
    const theme = useColorScheme();

    return (
        <View style={{
            borderRadius : 25,
            borderWidth: 2,
            borderColor: Colors('dedalBlue'),
            overflow: 'hidden'
        }}>
            <DefaultPicker
                mode="dropdown"
                dropdownIconColor={Colors('dedalBlue')}
                selectedValue={props.selectedValue}
                onValueChange={(itemValue, itemIndex) => {
                    props.onValueChange(itemValue)
                }}
                style={{ height: 50, color: Colors('Text', theme) }}
            >
                {props.items.map((item, i) => {
                    return (
                        <DefaultPicker.Item key={i} label={item[0]} value={item[1]} />
                    )
                })}
            </DefaultPicker>
        </View>
    )
}