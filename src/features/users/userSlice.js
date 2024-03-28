
import { createSlice } from '@reduxjs/toolkit';

const initialState= {
    users: [],
    loggedInUser: null,
    messages:[],
    searchQuery:"",
    searchMessage:"",
    groups:[],
    groupMessages:[],
  };

 const userSlice= createSlice({
    name:"user",
    initialState,
    reducers: {
        setLoggedInUser(state, action) {
            state.loggedInUser = action.payload;
          },
          setUsers(state, action) {
            state.users.push(action.payload);
          },
          setMessages(state, action) {
            state.messages.push(action.payload);
          },
          setSearchQuery(state, action) {
            state.searchQuery =action.payload
          },
          setSearchMessage(state, action) {
            state.searchMessage =action.payload
          },
          setGroups(state, action) {
            state.groups.push(action.payload);
          },
          setGroupMessages(state, action) {
            state.groupMessages.push(action.payload);
          }
    }
 }) 

 console.log(userSlice);

 export const{setLoggedInUser, setUsers,setMessages,setSearchQuery,
  setSearchMessage,setGroups,setGroupMessages}= userSlice.actions;
 export default userSlice.reducer;