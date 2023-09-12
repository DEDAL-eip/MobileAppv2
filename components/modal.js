import React from "react";
import { View } from "../constants/Themed";
import { CloseButton } from "./buttons/CloseButton";
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
        <Content Close={() => setOpen(false)}></Content>
      </View>
    </Modal>
  );
};

export default BasicModal;