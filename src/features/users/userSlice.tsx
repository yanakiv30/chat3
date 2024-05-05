import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 isRegister:false, isLoading:false,isEdit:false,
  users: [] as { id: string; username: string; password: string }[],
  loggedInUser: null as { username: string; id: string } | null,  
  messages: [] as {
    id: string;
    senderId: string;
    receiverId: string;
    senderUsername: string;
    content: string;
    hourMinDate: string;
    dayDate: string;
  }[],
  searchQuery: "",
  searchMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setIsRegister(state, action) {
      state.isRegister = action.payload;
    },
    setLoggedInUser(state, action) {
      state.loggedInUser = action.payload;
    },
    setUsers(state, action) {
      state.users = [...action.payload];
    },
    addUser(state, action) {
      state.users = [...state.users, action.payload];
    },
    setMessages(state, action) {
      state.messages = [...action.payload];
    },
    addMessage(state, action) {
      state.messages = [...state.messages, action.payload];
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSearchMessage(state, action) {
      state.searchMessage = action.payload;
    },
  },
});
export const {
  setLoggedInUser,
  setUsers,
  addUser,
  setMessages,
  addMessage,
  setSearchQuery,
  setSearchMessage,
  setIsRegister,
  setIsLoading,
  setIsEdit
  
} = userSlice.actions;
export default userSlice.reducer;
