
import { createSlice } from '@reduxjs/toolkit';

const initialState= {
    users: [],
    loggedInUser: null,
    messages:[],
    searchQuery:"",
    searchMessage:"",
  };

 const userSlice= createSlice({
    name:"user",
    initialState,
    reducers: {
        setLoggedInUser: (state, action) => {
            state.loggedInUser = action.payload;
          },
          setUsers: (state, action) => {
            state.users = action.payload;
          },
    }
 })

 console.log(userSlice);