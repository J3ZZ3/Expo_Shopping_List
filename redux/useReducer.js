import { createSlice } from "@reduxjs/toolkit";

const DELETE_ALL_ITEMS = 'DELETE_ALL_ITEMS';

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    editItem: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteItem: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    deleteAllItems: () => {
      return [];
    },
    loadItems: (state, action) => {
      return action.payload;
    },
  },
});

export const { addItem, editItem, deleteItem, deleteAllItems, loadItems } = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
