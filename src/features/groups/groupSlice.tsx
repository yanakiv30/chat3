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
export type Flash = { [key: string]: boolean };
export type Payload = {
  team_id: number;
 sender_id:number;
};
const initialState = {
  localTeams: [] as Team[],
  teamWithNewMessage: {} as Payload,
  
  isDeleteTeam :false
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
    setIsDeleteTeam(state, action) {
      state.isDeleteTeam = action.payload;
    },
   
  },
});
export const { setTeams, setTeamWithNewMessage,setIsDeleteTeam } = groupSlice.actions;
export default groupSlice.reducer;
