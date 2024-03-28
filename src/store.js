import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice"
import groupReducer from "./features/groups/groupSlice"





const initialStateGroup = {
    groups:[],
    groupMessages:[],
};

const store = configureStore({
  reducer:{
    user:userReducer,
    group:groupReducer
  }
});

export default store;