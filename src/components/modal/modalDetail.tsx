import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface ModalDetailProps {
  visible: boolean;
  onClose: () => void;
}

const ModalDetail: React.FC<ModalDetailProps> = ({visible, onClose}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Movie Details</Text>
          <Text style={styles.modalText}>
            Movie description goes here. This is a placeholder text to show the
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#F2C94C',
    borderRadius: 13,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    paddingHorizontal: 30,
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ModalDetail;