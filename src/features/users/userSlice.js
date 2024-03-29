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

    setMessages(state, action) {
      state.messages = [...action.payload];
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
    setGroupMessages(state, action) {
      state.groupMessages = [...action.payload];
    },
  },
});

// console.log("userSlice= ", userSlice);

export const {
  setLoggedInUser,
  setUsers,
  setMessages,
  setSearchQuery,
  setSearchMessage,
  setGroups,
  setGroupMessages,
} = userSlice.actions;
export default userSlice.reducer;
