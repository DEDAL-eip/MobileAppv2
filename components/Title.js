import { Separator } from "../constants/Themed";
import { Image } from "react-native";
import { Text, View } from "../constants/Themed";
import { global, titles } from "../style/styles";
export const Title = ({title, pict, subtitle}) => {
    return(
    <View style={global.titleContainer}>
        <Text style={titles.main}>{title}</Text>
        <Separator />
        <Text style={titles.subtitle}>{subtitle}</Text>
        {pict ? 
        <Image style={titles.image} source={pict} />
        : null}
    </View>
)}  
export const HomeTitle = ({title, pict, subtitle}) => {
    return(
    <View style={[global.titleContainer, {paddingHorizontal : '10%'}]}>
        <Text style={titles.main}>{title}</Text>
        <Separator />
        {pict ? 
            <Image style={titles.image} source={pict} />
            : null
        }
        <Text style={[titles.subtitle]}>{subtitle}</Text>
    </View>
)}  