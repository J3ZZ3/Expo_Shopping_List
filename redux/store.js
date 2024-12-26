import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './useReducer'

const store = configureStore({
    reducer: UserReducer
})

export default store