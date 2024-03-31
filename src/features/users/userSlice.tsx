import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [] as {id: string; username: string;password: string;}[],
  loggedInUser: null as { username: string;id: string;} | null,
  messages: [] as { content: string;}[],
  searchQuery: "",
  searchMessage: "", 
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedInUser(state, action) {
      state.loggedInUser = action.payload;
    },
    setUsers(state, action) {    
      state.users =[...action.payload];      
    },
    addUser(state, action) {     
      state.users =[...state.users,action.payload];     
    },
    setMessages(state, action) {
      state.messages = [...action.payload];
    },
    addMessage(state, action) {
      state.messages = [...state.messages,action.payload];
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
  setSearchMessage 
} = userSlice.actions;
export default userSlice.reducer;
