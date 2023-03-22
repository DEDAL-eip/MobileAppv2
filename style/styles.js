import { borderBottom, borderColor } from "@mui/system"
import { StyleSheet } from "react-native"
import Colors from "../constants/Colors"

export const global = StyleSheet.create({
  container: {
    height : '100%',
    flex : 1,
  },
  titleContainer : {
    alignItems: "center",
    paddingHorizontal : '10%',
  },
  middleContainer : {
    flex : 3,
    alignItems: "center",
    justifyContent : "center",
    width : '100%',

  },
  bottomContainer : {
    flex : 1,
    height : "10%",
    width : '100%',
    alignItems : "center",
    justifyContent : 'center'
  },
  textCenter : {
    textAlign: 'center',
  },
  hidden: {
    display : 'none',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  basicContainer : {
    width : '100%',
    alignItems : "center",
    justifyItems: "center"
  },
  header: {
    display : 'flex',
    flexDirection : 'row',
    width : '100%',
    alignItems : 'center',
    justifyContent : 'center',
    paddingBottom : 10,
  },
  modal : {
  }
})

export const button = StyleSheet.create({
  container : {
    backgroundColor : Colors('dedalBlue'),
    width : '75%',
    height : 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop : 5,
    borderRadius : 5,
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
    borderColor : Colors('Text')
  },
  disable : {
    backgroundColor : Colors('dedalBlueDisable'),
    width : '75%',
    height : 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop : 5,
    borderRadius : 5,
    color : Colors('Text')
  },
  logout : {
    position : 'absolute',
    top : 10,
    left : 10
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
    borderColor : Colors('dedalBlue'),
  },
  Error : {
    width : '50%',
    height : 30,
    marginTop : 5,
    borderRadius : 5,
    borderWidth: 1,
    paddingLeft : 10,
    borderColor : Colors('ErrorRed'),
  }
})

export const header = StyleSheet.create({
  backgroundColor: Colors('dedalBlue'),
  height: 50
})

export const map =  StyleSheet.create({
  width: '100%',
  height: '100%',
})

export const titleS = StyleSheet.create({
  main: {
    fontSize: 40,
    fontFamily : "Main",
    textAlign: 'center',
    lineBreak: 'normal',


  },
  subtitle : {
    fontSize:20,
    fontFamily : "Main",
    textAlign: 'center',

  },

  image: {
      alignSelf: 'center',
      marginTop : '10%',
      width: 158,
      height: 158,
  }
})

export const color = StyleSheet.create({
  text : {
    color : Colors('Text')
  },
  white : {
    color : Colors('White')
  },
  dedalBlueDisable : {
    color : Colors('dedalBlueDisable')
  },
  validateGreen : {
    color : Colors('ValidateGreen')
  },
  errorRed : {
    color : Colors('ErrorRed')
  },
  dedalBlueDisable : {
    color : Colors('dedalBlueDisable')
  },
})

export const table = StyleSheet.create({
  row : {
    flexDirection : 'row',
    width : '80%',
    alignItems : 'center'
  },
  col : {
    flex : 1,
    gap : 10,
  }
})

export const separator = StyleSheet.create({
  container : {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop : '10%',
  },
  bar : {
    flex: 1,
    height: 1,
    marginTop : "5%",
    backgroundColor : 'white',

  }
})

export const shadow = StyleSheet.create({
  Bottom : {
    borderBottomColor : '#fff',
    borderBottomWidth : 1
  },
  Top : {
    borderTopColor : '#fff',
    borderTopWidth : 1
  }
})