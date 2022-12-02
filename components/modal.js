import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { CloseButton } from "./Button";

const BasicModal = ({Open, setOpen, Content}) => {

  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={Open}
        onRequestClose={() => setOpen(!Open)}
      >
          <View style={styles.modal}>
            <CloseButton Close={() => setOpen(false)}></CloseButton>
              <Content></Content>
          </View>
      </Modal>
  );
};

const styles = StyleSheet.create({

  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent : "center",
    backgroundColor: "white",
    elevation: 5,
    margin: 20,
    marginBottom : 60,
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
});

export default BasicModal;