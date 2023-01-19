import { View } from "react-native";
import { Separator } from "./Separator";
import { Image, Text} from "react-native";
import { global, titleS } from "../style/styles";
export const Title = ({title, pict, subtitle}) => {
    return(
    <View style={global.titleContainer}>
        <Text style={titleS.main}>{title}</Text>
        <Separator />
        <Text style={titleS.subtitle}>{subtitle}</Text>
        {pict ? 
        <Image style={titleS.image} source={pict} />
        : null}
    </View>
)}  

export const HomeTitle = ({title, pict, subtitle}) => {
    return(
    <View style={[global.titleContainer, {paddingHorizontal : '10%'}]}>
        <Text style={titleS.main}>{title}</Text>
        <Separator />
        <Text style={[titleS.subtitle]}>{subtitle}</Text>
        {pict ? 
            <Image style={titleS.image} source={pict} />
            : null
        }
    </View>
)}  