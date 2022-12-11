import { borderRadius, borders, height } from "@mui/system"
import { StyleSheet } from "react-native"
import Colors from "../constants/Colors"

export const global = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer : {
      flex : 2,
      alignItems: "center",
      marginBottom : '30%',
  },
  middleContainer : {
      flex : 3,
      alignItems: "center",
      width : '100%',
      marginTop : '10%',

  },
  bottomContainer : {
      flex : 1,
      width : '100%',
      alignItems : "center",
  },
  textCenter : {
    textAlign: 'center',
  },
  hidden: {
    display : 'none',
  },
})

export const button = StyleSheet.create({
  container : {
    backgroundColor : Colors.light.dedalBlue,
    width : '75%',
    height : 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop : 5,
    borderRadius : 5
  },
  close : {
    alignSelf: 'flex-end',
    position: 'absolute',
    alignItems: "center",
    justifyContent: "center",
    top : 10,
    right : 10,
    width : 25,
    height : 25,
    borderRadius : 100,
    borderWidth: 2,
    borderColor : Colors.light.black
  },
  disable : {
    backgroundColor : Colors.light.dedalBlueDisable,
    width : '75%',
    height : 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop : 5,
    borderRadius : 5
  }
})

export const textInput = StyleSheet.create({
  global : {
    width : '50%',
    height : 30,
    marginTop : 5,
    borderRadius : 5,
    borderWidth: 1,
    paddingLeft : 10,
    borderColor : Colors.light.dedalBlue,
  },
  Error : {
    width : '50%',
    height : 30,
    marginTop : 5,
    borderRadius : 5,
    borderWidth: 1,
    paddingLeft : 10,
    borderColor : Colors.light.ErrorRed,
  }
})

export const header = StyleSheet.create({
  backgroundColor: Colors.light.dedalBlue,
  height: '5%'
})