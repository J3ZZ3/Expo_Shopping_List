import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  StyleSheet,
  Modal,
  Button,
  Switch,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem, deleteItem } from "../redux/useReducer";
import FAB from '../components/FAB';

const ShoppingList = () => {
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemId, setItemId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const shoppingList = useSelector((state) => state.shoppingList);

  const handleAddItem = () => {
    if (itemName.trim() && itemQuantity.trim()) {
      dispatch(
        addItem({
          id: Date.now().toString(),
          name: itemName,
          quantity: itemQuantity,
          purchased: false,
        })
      );
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
      dispatch(
        editItem({ id: itemId, name: itemName, quantity: itemQuantity })
      );
      resetModal();
    }
  };

  const handleTogglePurchased = (id) => {
    const item = shoppingList.find((item) => item.id === id);
    if (item) {
      dispatch(editItem({ ...item, purchased: !item.purchased }));
    }
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  const resetModal = () => {
    setItemName("");
    setItemQuantity("");
    setItemId(null);
    setModalVisible(false);
  };

  const filteredShoppingList = shoppingList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Shopping List</Text>
      </View>
      <TextInput
        placeholder="Search Items"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      <Button title="Add Item" onPress={() => setModalVisible(true)} color="#444" />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={resetModal}
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
              <Button
                title={itemId ? "Update" : "Add"}
                onPress={itemId ? handleUpdateItem : handleAddItem}
                color="#000"
              />
              <Button title="Cancel" onPress={resetModal} color="#000" />
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        data={filteredShoppingList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Switch
              value={item.purchased}
              onValueChange={() => handleTogglePurchased(item.id)}
            />
            <Text
              style={{
                textDecorationLine: item.purchased ? "line-through" : "none",
                flex: 1,
                color: item.purchased ? "#aaa" : "#fff",
              }}
            >
              {item.name} ({item.quantity})
            </Text>
            <Pressable onPress={() => handleEditItem(item)} style={styles.iconButton}>
              <Icon name="edit" size={24} color="white" />
            </Pressable>
            <Pressable onPress={() => handleDeleteItem(item.id)} style={styles.iconButton}>
              <Icon name="delete" size={24} color="red" />
            </Pressable>
          </View>
        )}
      />
      <FAB />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "transparent",
    top: 30,
  },
  header: {
    backgroundColor: "#444",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    backgroundColor: "grey",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 5,
  },
  iconButton: {
    marginLeft: 10,
  },
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
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: "grey",
  },
});

export default ShoppingList;