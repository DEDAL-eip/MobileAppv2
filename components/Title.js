import { View } from "./Themed";
import { Separator } from "./Separator";
import { Image, StyleSheet, Text} from "react-native";
export const Title = ({title, pict, subtitle}) => {
    return(
    <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Separator />
        <Text >{subtitle}</Text>
        <Image style={styles.image} source={pict} />
    </View>
)}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 40,
      fontWeight: "bold",
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    titleContainer : {
      flex : 1,
      alignItems: "center",
      padding : '20%',
    },
    middleContainer : {
      flex : 2,
      width : '75%',
  
    },
    image:
    {
        alignSelf: 'center',
        marginTop : '10%',
        width: 158,
        height: 158
    },
  });
  