import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, TextInput, StyleSheet, Modal, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, editItem, deleteItem } from '../redux/useReducer';

const ShoppingList = () => {
  const [itemName, setItemName] = useState('');
  const [itemId, setItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const shoppingList = useSelector(state => state.shoppingList);

  const handleAddItem = () => {
    if (itemName.trim() && itemQuantity.trim()) {
      dispatch(addItem({ id: Date.now().toString(), name: itemName, quantity: itemQuantity }));
      setItemName('');
      setItemQuantity('');
      setModalVisible(false);
    }
  };

  const handleEditItem = (item) => {
    setItemName(item.name);
    setItemId(item.id);
  };

  const handleUpdateItem = () => {
    if (itemId && itemName.trim()) {
      dispatch(editItem({ id: itemId, name: itemName }));
      setItemName('');
      setItemId(null);
    }
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  const filteredList = shoppingList.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Button title="Add Item" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
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
          <Button title="Add" onPress={handleAddItem} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <TextInput
        style={styles.input}
        placeholder="Search items..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.name} ({item.quantity})</Text>
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
  itemContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, padding: 10, backgroundColor: '#fff', borderRadius: 5 },
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
});

export default ShoppingList; 