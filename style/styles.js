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
    width : '85%',
    height : 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop : 5,
    borderRadius : 25,
    fontWeight : "bold"
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
    borderWidth: 1,
    borderColor : Colors('Text')
  },
  disable : {
    backgroundColor : Colors('dedalBlueDisable'),
    width : '85%',
    height : 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop : 5,
    borderRadius : 25,
    color : Colors('Text')
  }
})

export const textInput = StyleSheet.create({
  global : {
    width : '90%',
    height : 50,
    marginTop : 5,
    borderRadius : 25,
    borderWidth: 2,
    marginTop : 5,
    paddingLeft : 10,
    borderColor : Colors('dedalBlue'),
  },
  Error : {
    width : '90%',
    height : 50,
    marginTop : 5,
    borderRadius : 25,
    borderWidth: 2,
    marginTop : 5,
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

export const text = StyleSheet.create({
  large: {
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily : "Main",
    textAlign: 'center',
    lineBreak: 'normal',
  },

  medium:{
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily : "Main",
  },

  small : {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily : "Main",
  },

  image: {
      alignSelf: 'center',
      width: 287,
      height: 287,
  }
})

export const color = StyleSheet.create({
  text : {
    color : Colors('Text')
  },
  white : {
    color : Colors('White'),
    fontWeight : 'bold'
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

export const modal = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    margin: 5,
    marginBottom: 20,
    paddingBottom: 20,
    borderRadius: 20,
    paddingTop: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
})