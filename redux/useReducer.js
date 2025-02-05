import { createSlice } from "@reduxjs/toolkit";

const DELETE_ALL_ITEMS = 'DELETE_ALL_ITEMS';
export const ADD_SAVED_LIST = 'ADD_SAVED_LIST';

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: {
    currentList: [],
    savedLists: []  // Array of {id, name, items, createdAt}
  },
  reducers: {
    addItem: (state, action) => {
      state.currentList.push({
        ...action.payload,
        category: action.payload.category || 'Uncategorized',
        notes: action.payload.notes || ''
      });
    },
    editItem: (state, action) => {
      const index = state.currentList.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.currentList[index] = {
          ...action.payload,
          category: action.payload.category || state.currentList[index].category,
          notes: action.payload.notes || state.currentList[index].notes
        };
      }
    },
    deleteItem: (state, action) => {
      state.currentList = state.currentList.filter(item => item.id !== action.payload);
    },
    deleteAllItems: (state) => {
      state.currentList = [];
    },
    loadItems: (state, action) => {
      state.currentList = action.payload;
    },
    saveCurrentList: (state, action) => {
      const newList = {
        id: Date.now().toString(),
        name: action.payload.name,
        items: [...state.currentList],
        createdAt: new Date().toISOString()
      };
      state.savedLists.push(newList);
    },
    loadSavedList: (state, action) => {
      state.currentList = action.payload.items;
    },
    deleteSavedList: (state, action) => {
      state.savedLists = state.savedLists.filter(list => list.id !== action.payload);
    },
    addSavedList: (state, action) => {
      const listExists = state.savedLists.some(list => list.id === action.payload.id);
      if (listExists) {
        return state;
      }
      return {
        ...state,
        savedLists: [...state.savedLists, action.payload],
      };
    },
    saveCurrentList: (state, action) => {
      const newList = {
        id: Date.now().toString(),
        name: action.payload.name,
        items: state.currentList,
        createdAt: new Date().toISOString(),
      };
      state.savedLists.push(newList);
    },
  },
});

export const { 
  addItem, editItem, deleteItem, deleteAllItems, loadItems,
  saveCurrentList, loadSavedList, deleteSavedList, addSavedList
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
