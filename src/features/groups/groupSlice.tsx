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
  members: User[];
  messages: Message[];
};
export type Payload = {
  team_id: number;
 sender_id:number;
};
const initialState = {
  localTeams: [] as Team[],
  teamWithNewMessage: {} as Payload,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setTeams(state, action) {
      state.localTeams = [...action.payload];
    },
    setTeamWithNewMessage(state, action) {
      state.teamWithNewMessage = action.payload;
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
export const { setTeams, setTeamWithNewMessage } = groupSlice.actions;
export default groupSlice.reducer;
