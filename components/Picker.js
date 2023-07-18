import { useColorScheme, View, Text } from "react-native";
import { Picker as DefaultPicker } from '@react-native-picker/picker';

import Colors from "../constants/Colors";

export const Picker = (({
    title,
    items,
    selectedValue,
    onValueChange,
    disable,
    style
}) => {
    const theme = useColorScheme();

    return (
        <View style={{}}>
            <Text style={[{ color: Colors('Text', theme), fontWeight: 'bold'}]}>{title}</Text>
            <View style={{
                borderRadius : 25,
                borderWidth: 2,
                borderColor: Colors('dedalBlue'),
                overflow: 'hidden'
            }}>
                <DefaultPicker
                    mode="dropdown"
                    dropdownIconColor={Colors('dedalBlue')}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => {
                        onValueChange(itemValue)
                    }}
                    style={{ height: 50, color: Colors('Text', theme) }}
                    disable={disable}
                >
                    {items.map((item, i) => {
                        return (
                            <DefaultPicker.Item key={i} label={item[0]} value={item[1]} />
                        )
                    })}
                </DefaultPicker>
            </View>
        </View>
    )
})