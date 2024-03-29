import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loggedInUser: null,
  messages: [],
  searchQuery: "",
  searchMessage: "",
  groups: [],
  groupMessages: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedInUser(state, action) {
      state.loggedInUser = action.payload;
    },
    setUsers(state, action) {
      // console.log(
      //   " previous state.users= ",
      //   state.users,
      //   " payload= ",
      //   action.payload
      // );
      state.users =[...action.payload];
      // console.log("state.users= ", state.users, " payload= ", action.payload);
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
    setGroups(state, action) {
      state.groups = [...action.payload];
    },
    addGroup(state, action) {
      state.groups = [...state.groups,action.payload];
    },
    setGroupMessages(state, action) {
      state.groupMessages = [...action.payload];
    },

    addGroupMessage(state, action) {
      state.groupMessages = [...state.groupMessages,action.payload];
    },
  },
});

// console.log("userSlice= ", userSlice);

export const {
  setLoggedInUser,
  setUsers,
  addUser,
  setMessages,
  addMessage,
  setSearchQuery,
  setSearchMessage,
  setGroups,
  addGroup,
  setGroupMessages,
  addGroupMessage
} = userSlice.actions;
export default userSlice.reducer;
