import { View } from "./Themed";
import { Separator } from "./Separator";
import { Image, StyleSheet, Text} from "react-native";
import { global } from "../style/styles";
export const Title = ({title, pict, subtitle}) => {
    return(
    <View style={global.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Separator />
        <Text style={styles.subtitle}>{subtitle}</Text>
        {pict ? 
        <Image style={styles.image} source={pict} />
        : null}
    </View>
)}

const styles = StyleSheet.create({
    title: {
      fontSize: 40,
      textAlign: 'center',
      fontWeight: "bold",
      lineBreak: 'normal'
    },
    titleContainer : {
      backgroundColor : 'red',
      alignItems: "center",
      paddingHorizontal : '15%',
      marginTop : 50
    },
    subtitle : {
      textAlign: 'center',
    },
    image:
    {
        alignSelf: 'center',
        marginTop : '10%',
        width: 158,
        height: 158
    },
  });
  