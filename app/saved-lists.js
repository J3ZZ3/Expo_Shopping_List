import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Alert, Platform, Animated, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { loadSavedList, deleteSavedList } from '../redux/useReducer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ImageBackground } from 'react-native';
import backgroundImage from '../assets/images/pantry.jpg';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SavedLists() {
  const router = useRouter();
  const dispatch = useDispatch();
  const savedLists = useSelector(state => state.shoppingList.savedLists);
  const bounceValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  React.useEffect(() => {
    loadSavedListsFromStorage();
  }, []);

  React.useEffect(() => {
    saveSavedListsToStorage();
  }, [savedLists]);

  const loadSavedListsFromStorage = async () => {
    try {
      const savedListsJson = await AsyncStorage.getItem('savedLists');
      if (savedListsJson) {
        const lists = JSON.parse(savedListsJson);
        lists.forEach(list => {
          dispatch({ type: 'ADD_SAVED_LIST', payload: list });
        });
      }
    } catch (error) {
      console.error('Error loading saved lists:', error);
      Alert.alert('Error', 'Failed to load saved lists');
    }
  };

  const saveSavedListsToStorage = async () => {
    try {
      await AsyncStorage.setItem('savedLists', JSON.stringify(savedLists));
    } catch (error) {
      console.error('Error saving lists:', error);
      Alert.alert('Error', 'Failed to save lists');
    }
  };

  const handleLoadList = (list) => {
    dispatch(loadSavedList(list));
    router.back();
  };

  const handleDeleteList = (listId) => {
    Alert.alert(
      "Delete List",
      "Are you sure you want to delete this list?",
      [
        { text: "Cancel" },
        { 
          text: "Delete",
          onPress: () => dispatch(deleteSavedList(listId)),
          style: "destructive"
        }
      ]
    );
  };

  const generateHTML = (list) => {
    const itemsList = list.items.map(item => 
      `<tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.category}</td>
        <td>${item.purchased ? 'Yes' : 'No'}</td>
      </tr>`
    ).join('');

    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>${list.name}</h1>
          <p>Created: ${new Date(list.createdAt).toLocaleDateString()}</p>
          <table>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Purchased</th>
            </tr>
            ${itemsList}
          </table>
        </body>
      </html>
    `;
  };

  const handleShareList = async (list) => {
    try {
      const html = generateHTML(list);
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false
      });
      
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: `Share ${list.name}`,
        UTI: 'com.adobe.pdf'
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share list');
      console.error(error);
    }
  };

  return (
    <ImageBackground 
      source={backgroundImage} 
      style={styles.background} 
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Saved Lists</Text>
          {savedLists.length === 0 ? (
            <Animated.Text 
              style={[
                styles.emptyText,
                {
                  transform: [{
                    translateY: bounceValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -10]
                    })
                  }]
                }
              ]}
            >
              No saved lists 📝
            </Animated.Text>
          ) : (
            <FlatList
              data={savedLists}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable 
                  style={styles.listItem}
                  onPress={() => handleLoadList(item)}
                >
                  <View>
                    <Text style={styles.listName}>{item.name}</Text>
                    <Text style={styles.listDate}>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </Text>
                    <Text style={styles.itemCount}>
                      {item.items.length} items
                    </Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    <Pressable 
                      onPress={() => handleShareList(item)}
                      style={styles.iconButton}
                    >
                      <Icon name="share" size={24} color="white" />
                    </Pressable>
                    <Pressable 
                      onPress={() => handleDeleteList(item.id)}
                      style={styles.deleteButton}
                    >
                      <Icon name="delete" size={24} color="red" />
                    </Pressable>
                  </View>
                </Pressable>
              )}
            />
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
  },
  container: {
    flex: 1,
    marginTop: 20,
    padding: 20,
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'android' ? 40 : 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: 'rgba(68, 68, 68, 0.8)', // Semi-transparent background
    padding: 15,
    borderRadius: 8,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(68, 68, 68, 0.8)', // Semi-transparent background
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  listName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  listDate: {
    color: '#ddd',
    fontSize: 14,
  },
  itemCount: {
    color: '#ddd',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
    marginRight: 10,
  },
  deleteButton: {
    padding: 10,
  },
  emptyText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginTop: '80%',
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 8,
  },
}); 