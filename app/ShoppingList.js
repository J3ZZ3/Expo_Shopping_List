import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, TextInput, StyleSheet, Modal, Button, CheckBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, editItem, deleteItem } from '../redux/useReducer';

const ShoppingList = () => {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemId, setItemId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const shoppingList = useSelector(state => state.shoppingList);

  const handleAddItem = () => {
    if (itemName.trim() && itemQuantity.trim()) {
      dispatch(addItem({ id: Date.now().toString(), name: itemName, quantity: itemQuantity, purchased: false }));
      resetModal();
    }
  };

  const handleEditItem = (item) => {
    setItemName(item.name);
    setItemQuantity(item.quantity);
    setItemId(item.id);
    setModalVisible(true);
  };

  const handleUpdateItem = () => {
    if (itemId && itemName.trim() && itemQuantity.trim()) {
      dispatch(editItem({ id: itemId, name: itemName, quantity: itemQuantity }));
      resetModal();
    }
  };

  const handleTogglePurchased = (id) => {
    const item = shoppingList.find(item => item.id === id);
    if (item) {
      dispatch(editItem({ ...item, purchased: !item.purchased }));
    }
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  const resetModal = () => {
    setItemName('');
    setItemQuantity('');
    setItemId(null);
    setModalVisible(false);
  };

  const filteredShoppingList = shoppingList.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Items"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      <Button title="Add Item" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={resetModal}
      >
        <View style={styles.modalView}>
          <TextInput
            placeholder="Item Name"
            value={itemName}
            onChangeText={setItemName}
          />
          <TextInput
            placeholder="Quantity"
            value={itemQuantity}
            onChangeText={setItemQuantity}
            keyboardType="numeric"
          />
          <Button title={itemId ? "Update" : "Add"} onPress={itemId ? handleUpdateItem : handleAddItem} />
          <Button title="Cancel" onPress={resetModal} />
        </View>
      </Modal>
      <FlatList
        data={filteredShoppingList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <CheckBox
              value={item.purchased}
              onValueChange={() => handleTogglePurchased(item.id)}
            />
            <Text style={{ textDecorationLine: item.purchased ? 'line-through' : 'none' }}>
              {item.name} ({item.quantity})
            </Text>
            <Pressable onPress={() => handleEditItem(item)}>
              <Text style={styles.editText}>Edit</Text>
            </Pressable>
            <Pressable onPress={() => handleDeleteItem(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8f8f8' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  button: { backgroundColor: '#306A68', padding: 10, alignItems: 'center' },
  buttonText: { color: 'white' },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  editText: { color: 'blue' },
  deleteText: { color: 'red' },
  modalView: {
    margin: 20,
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
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default ShoppingList; 