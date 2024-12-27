import { configureStore } from "@reduxjs/toolkit";
import shoppingListReducer from './useReducer';

const store = configureStore({
    reducer: {
        shoppingList: shoppingListReducer,
    }
});

export default store;