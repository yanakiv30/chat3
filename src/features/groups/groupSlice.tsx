import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [] as { name: string;id: string; }[],
 
  groupMessages: [],
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroups(state, action) {
      state.groups = [...action.payload];
    },
    addGroup(state, action) {
      state.groups = [...state.groups, action.payload];
    },
    setGroupMessages(state, action) {
      state.groupMessages = [...action.payload];
    },

    addGroupMessage(state, action) {
      state.groupMessages = [...state.groupMessages, action.payload];
    },
  },
});
export const { setGroups, addGroup, setGroupMessages, addGroupMessage } =
  groupSlice.actions;
export default groupSlice.reducer;
