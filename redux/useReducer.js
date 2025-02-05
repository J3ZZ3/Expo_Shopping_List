import { createSlice } from "@reduxjs/toolkit";

const DELETE_ALL_ITEMS = 'DELETE_ALL_ITEMS';

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
    }
  },
});

export const { 
  addItem, editItem, deleteItem, deleteAllItems, loadItems,
  saveCurrentList, loadSavedList, deleteSavedList 
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
