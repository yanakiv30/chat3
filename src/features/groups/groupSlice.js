
import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    groups:[],
    groupMessages:[],
};

const groupSlice= createSlice({
    name:"group",
    initialState,
    reducers: {
        setGroups(state, action) {
            state.groups.push(action.payload);
          },
          setGroupMessages(state, action) {
            state.groupMessages.push(action.payload);
          },
    }
 }) 

 console.log(groupSlice);

 export const{setLoggedInUser, setUsers}= groupSlice.actions;
 export default groupSlice.reducer;