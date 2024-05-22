import { createSlice } from "@reduxjs/toolkit";
import { User } from "../users/userSlice";
export type Message = {
  id: number;
  senderId: number;
  content: string;
  hourMinDate: string;
  dayDate: string;
};
export type Team = {
  id: number;
  name: string;
  avatar: string;
  members?: User[];
  messages?: Message[];
};
const initialState = {
  teams: [] as Team [],
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setTeams(state, action) {
      state.teams = [...action.payload];
    },

    // setGroups(state, action) {
    //   state.groups = [...action.payload];
    // },

    // addGroup(state, action) {
    //   state.groups = [...state.groups, action.payload];
    // },
    // setGroupMessages(state, action) {
    //   state.groupMessages = [...action.payload];
    // },

    // addGroupMessage(state, action) {
    //   state.groupMessages = [...state.groupMessages, action.payload];
    // },
  },
});
export const { setTeams } = groupSlice.actions;
export default groupSlice.reducer;
