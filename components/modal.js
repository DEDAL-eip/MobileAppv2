import React from "react";
import { View } from "../constants/Themed";
import { CloseButton } from "./Button";
import { modal } from "../style/styles";
import { Modal } from "../constants/Themed";
const BasicModal = ({ Open, setOpen, Content }) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={Open}
      onRequestClose={() => setOpen(!Open)}
    >
      <View style={modal.modal}>
        <CloseButton Close={() => setOpen(false)}></CloseButton>
        <Content></Content>
      </View>
    </Modal>
  );
};



export default BasicModal;