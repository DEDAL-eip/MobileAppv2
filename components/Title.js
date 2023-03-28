import { Separator } from "../constants/Themed";
import { Image} from "react-native";
import { Text, View } from "../constants/Themed";
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
        {pict ? 
            <Image style={titleS.image} source={pict} />
            : null
        }
        <Text style={[titleS.subtitle]}>{subtitle}</Text>
    </View>
)}  