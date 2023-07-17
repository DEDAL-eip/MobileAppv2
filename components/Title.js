import { Separator } from "../constants/Themed";
import { Image } from "react-native";
import { Text, View } from "../constants/Themed";
import { global, text } from "../style/styles";
export const Title = ({title, pict, subtitle}) => {
    return(
    <View style={global.titleContainer}>
        <Text style={text.large}>{title}</Text>
        <Separator />
        <Text style={text.small}>{subtitle}</Text>
        {pict ? 
        <Image style={text.image} source={pict} />
        : null}
    </View>
)}  
export const HomeTitle = ({title, pict, subtitle}) => {
    return(
    <View style={[global.titleContainer, {paddingHorizontal : '10%'}]}>
        <Text style={text.large}>{title}</Text>
        <Separator />
        {pict ? 
            <Image style={text.image} source={pict} />
            : null
        }
        <Text style={[text.small]}>{subtitle}</Text>
    </View>
)}  