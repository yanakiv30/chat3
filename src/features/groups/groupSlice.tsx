import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [] as {
    name: string;
    id: string;
    members: [string];
    admin: string;
  }[],
  groupMessages: [] as {
    id: string;
    senderId: string;
    receiverId: string;
    senderUsername: string;
    content: string;
    hourMinDate: string;
    dayDate: string;
  }[],
  teamsMembers: [] as {
    id: number;
    role: string;
    team_id: number;
    user_id: number;
  }[],
  teams: [] as { id: number; name: string; avatar: string }[],
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroups(state, action) {
      state.groups = [...action.payload];
    },
    setTeams(state, action) {
      state.teams = [...action.payload];
    },
    setTeamsMembers(state, action) {
      state.teamsMembers = [...action.payload];
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
export const {
  setGroups,
  addGroup,
  setGroupMessages,
  addGroupMessage,
  setTeams,
  setTeamsMembers,
} = groupSlice.actions;
export default groupSlice.reducer;
