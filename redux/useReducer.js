import { createSlice } from "@reduxjs/toolkit";

const userlistSlice = createSlice({
  name: 'usersList',
  initialState: [],
  reducers: {
    addUsers: (state, action) => {
      return action.payload;
    },
    addUser: (state, action) => {
      if (state.length > 0) {
        state = [action.payload];
      } else {
        state = [...state, action.payload];
      }
      return state;
    },
    updateUser: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    deleteUser: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addUsers, addUser, updateUser, deleteUser } = userlistSlice.actions;

export default userlistSlice.reducer
