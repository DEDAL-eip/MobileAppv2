import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";

const BasicModal = ({Open, setOpen}) => {
  const [Code, setCode] = useState("")
  const [NewPW, setNewPW] = useState("")

  const Validate = (() => {
    console.log(Code, NewPW)
  })

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={Open}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setOpen(!Open);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setOpen(!Open)}
            >
            <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
            <Text style={styles.modalText}>Rest Password</Text>
            <TextInput
              onChangeText={setCode}
              value={Code}
              placeholder="Code"
              keyboardType="numeric"

            />
            <TextInput
              onChangeText={setNewPW}
              value={setNewPW}
              placeholder="set new Password"
            />
             <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={Validate}
              >
                <Text style={styles.textStyle}>Validate</Text>
            </Pressable>
            <Text style={styles.modalText}>Code : {Code}</Text>
            
              
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default BasicModal;