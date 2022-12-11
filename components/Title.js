import { View } from "./Themed";
import { Separator } from "./Separator";
import { Image, StyleSheet, Text} from "react-native";
export const Title = ({title, pict, subtitle}) => {
    return(
    <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Separator />
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Image style={styles.image} source={pict} />
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
      alignItems: "center",
      paddingHorizontal : '15%',
      paddingBottom : "10%",
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
  