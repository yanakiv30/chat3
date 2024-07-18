import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import groupReducer from "./groups/groupSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
    group: groupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
