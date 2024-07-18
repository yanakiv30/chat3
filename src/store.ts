import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Components/userSlice";
import groupReducer from "./utils/groupSlice";
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
