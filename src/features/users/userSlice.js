
import { createSlice } from '@reduxjs/toolkit';

const initialState= {
    users: [],
    loggedInUser: null,
    messages:[],
    searchQuery:"",
    searchMessage:"",
  };
//setMessages([...messages, data]
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
          }
    }
 }) 

 console.log(userSlice);

 export const{setLoggedInUser, setUsers}= userSlice.actions;
 export default userSlice.reducer;