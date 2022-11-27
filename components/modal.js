import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import { CloseButton } from "./Button";

const BasicModal = ({Open, setOpen, Content}) => {

  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={Open}
        onRequestClose={() => setOpen(!Open)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CloseButton Close={() => setOpen(false)}></CloseButton>
              <Content></Content>
          </View>
        </View>
      </Modal>
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
    marginBottom : 60,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 40,
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
});

export default BasicModal;