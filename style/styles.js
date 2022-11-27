import { StyleSheet } from "react-native"

export const global = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer : {
      flex : 1,
      alignItems: "center",
      padding : '20%',
    },
    middleContainer : {
        flex : 3,
        width : '75%',
    },
    bottomContainer : {
        flex : 1,
        width : '75%',
    },
    textCenter : {
      textAlign: 'center',
    },
    hidden: {
      display : 'none',
  },
})

export const modal = StyleSheet.create({
  container: {
    flex: 1,
    margin : 10,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer : {
      flex : 2,
      alignItems: "center",
    },
    middleContainer : {
        flex : 4,
        width : '75%',
    },
    bottomContainer : {
        flex : 1,
        alignItems : 'center',
        width : '75%',
    }
})