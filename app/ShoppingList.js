import React, { useState, useEffect } from "react";
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
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem, deleteItem, loadItems, saveCurrentList } from "../redux/useReducer";
import FAB from '../components/FAB';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import SearchBar from '../components/SearchBar'
import ItemDetail from '../components/ItemDetail';
import Header from '../components/Header';

const ShoppingList = () => {
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemId, setItemId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemCategory, setItemCategory] = useState("Uncategorized");
  const [itemNotes, setItemNotes] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [saveListModalVisible, setSaveListModalVisible] = useState(false);
  const [listName, setListName] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const dispatch = useDispatch();
  const shoppingList = useSelector((state) => state.shoppingList.currentList);
  const router = useRouter();

  const categories = ["All", "Produce", "Dairy", "Meat", "Pantry", "Household", "Other", "Uncategorized"];

  // Load saved items when component mounts
  useEffect(() => {
    loadSavedItems();
  }, []);

  // Save items whenever the list changes
  useEffect(() => {
    saveItems();
  }, [shoppingList]);

  const loadSavedItems = async () => {
    try {
      const savedItems = await AsyncStorage.getItem('shoppingList');
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        dispatch(loadItems(parsedItems));
      }
    } catch (error) {
      console.error('Error loading items:', error);
      Alert.alert('Error', 'Failed to load shopping list');
    }
  };

  const saveItems = async () => {
    try {
      await AsyncStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    } catch (error) {
      console.error('Error saving items:', error);
    }
  };

  const handleAddItem = () => {
    if (itemName.trim() && itemQuantity.trim()) {
      dispatch(
        addItem({
          id: Date.now().toString(),
          name: itemName,
          quantity: itemQuantity,
          category: itemCategory,
          notes: itemNotes,
          purchased: false,
          createdAt: new Date().toISOString(),
        })
      );
      resetModal();
    }
  };

  const handleEditItem = (item) => {
    setItemName(item.name);
    setItemQuantity(item.quantity);
    setItemId(item.id);
    setItemCategory(item.category);
    setItemNotes(item.notes);
    setModalVisible(true);
  };

  const handleUpdateItem = () => {
    if (itemId && itemName.trim() && itemQuantity.trim()) {
      dispatch(
        editItem({ id: itemId, name: itemName, quantity: itemQuantity, category: itemCategory, notes: itemNotes })
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
    setItemCategory("Uncategorized");
    setItemNotes("");
    setModalVisible(false);
  };

  const handleSaveList = () => {
    if (listName.trim()) {
      dispatch(saveCurrentList({ name: listName }));
      setListName("");
      setSaveListModalVisible(false);
      Alert.alert("Success", "List saved successfully!");
    }
  };

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setDetailModalVisible(true);
  };

  const filteredShoppingList = (shoppingList || [])
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || item.category === selectedCategory)
    );

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar/>
      <View style={styles.categoryFilter}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <Pressable
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.selectedCategoryChip
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={styles.categoryChipText}>{category}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <Button title="Add Item" onPress={() => setModalVisible(true)} color="#444"  />
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
            <Picker
              selectedValue={itemCategory}
              onValueChange={setItemCategory}
              style={styles.picker}
            >
              {categories.filter(cat => cat !== "All").map((category) => (
                <Picker.Item key={category} label={category} value={category} />
              ))}
            </Picker>
            <TextInput
              placeholder="Notes (optional)"
              value={itemNotes}
              onChangeText={setItemNotes}
              style={styles.input}
              multiline
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={saveListModalVisible}
        onRequestClose={() => setSaveListModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="List Name"
              value={listName}
              onChangeText={setListName}
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <Button title="Save" onPress={handleSaveList} color="#000" />
              <Button 
                title="Cancel" 
                onPress={() => setSaveListModalVisible(false)} 
                color="#000" 
              />
            </View>
          </View>
        </View>
      </Modal>
      {filteredShoppingList.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            {searchQuery ? 'No items match your search' : 'Your shopping list is empty'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredShoppingList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleItemPress(item)}>
              <View style={styles.itemContainer}>
                <Pressable onPress={() => handleTogglePurchased(item.id)} style={styles.checkbox}>
                  <Icon 
                    name={item.purchased ? "check-box" : "check-box-outline-blank"} 
                    size={24} 
                    color="white" 
                  />
                </Pressable>
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
            </Pressable>
          )}
        />
      )}
      <FAB />
      <Pressable 
        style={styles.saveFAB}
        onPress={() => setSaveListModalVisible(true)}
      >
        <Icon name="save" size={24} color="white" />
      </Pressable>
      <ItemDetail 
        item={selectedItem}
        visible={detailModalVisible}
        onClose={() => {
          setDetailModalVisible(false);
          setSelectedItem(null);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "transparent",
    paddingTop: Platform.OS === 'android' ? 40 : 30,
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
    width: '90%',
    backgroundColor: Platform.select({
      ios: "grey",
      android: "#333"
    }),
    borderRadius: 10,
    padding: 20,
    alignItems: "center",

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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  categoryFilter: {
    marginVertical: 10,
    height: 40,
  },
  categoryChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#444',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedCategoryChip: {
    backgroundColor: '#666',
  },
  categoryChipText: {
    padding: 1,
    color: '#fff',
  },
  picker: {
    width: '100%',
    marginBottom: 10,
    color: '#fff',
  },
  notesText: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 5,
  },
  saveFAB: {
    position: 'absolute',
    right: 30,
    bottom: 37,
    backgroundColor: '#444',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
});

export default ShoppingList;