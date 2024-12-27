import React from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

const ItemModal = ({ visible, onClose, itemName, setItemName, itemQuantity, setItemQuantity, onSubmit }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <TextInput
            placeholder="Item Name"
            value={itemName}
            onChangeText={setItemName}
            style={styles.input}
          />
          <TextInput
            placeholder="Quantity"
            value={itemQuantity}
            onChangeText={setItemQuantity}
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Button title="Update" onPress={onSubmit} />
            <Button title="Cancel" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalView: {
        width: '80%',
        backgroundColor: "grey",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%', // Full width for input fields
    backgroundColor: "#f9f9f9", // Light background for input fields
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons side by side
    justifyContent: 'space-between', // Space between buttons
    width: '100%', // Full width for the button container
    color: '#000'
  },
});

export default ItemModal; 