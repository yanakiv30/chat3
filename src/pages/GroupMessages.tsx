import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchInMessage from "../features/users/SearchInMessage";
import Avatar from "../features/users/Avatar";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../store";

import SendUserMessage from "../features/users/SendUserMessage";
import { searchedGroupMessagesFunc } from "../utils/messageUtils";
import UserMessagesContainer from "../features/users/UserMessageContainer";
import { setIsLoading } from "../features/users/userSlice";
import supabase from "../services/supabase";
import EditUserMessage from "../features/users/EditUserMessage";
import Empty from "./Empty";

export default function GroupMessages() {
  const navigate = useNavigate();
  const { loggedInUser, searchMessage, isEdit } = useAppSelector((store) => store.user);
  const { localTeams } = useAppSelector((store) => store.group);
  const [newGroupMessage, setNewGroupMessage] = useState("");
  const params = useParams();
  //console.log("params = ",params);
  const groupInListId = +params.groupId!;
 // console.log("groupInListId", groupInListId);
  const dispatch = useDispatch();
  const team = localTeams.find((x) => x.id === groupInListId)!;
 
  if(!team) return <Empty/>

  async function handleSendGroupMessage() {
    if (newGroupMessage.trim() !== "") {
      const newGroupMessageObject = {
        sender_id: loggedInUser!.id,
        team_id: groupInListId,
        type: "text",
        message: newGroupMessage,
      };

      dispatch(setIsLoading(true));
      try {
        const { data, error } = await supabase
          .from("messages")
          .insert(newGroupMessageObject)
          .select();
        if (error) {
          throw new Error(error.message);
        }
      } catch (error) {
        const errorMessage="Error creating Group message: "+ error;
        console.error(errorMessage);
        alert(errorMessage);
      } finally {
        dispatch(setIsLoading(false));
      }
      setNewGroupMessage("");
    }
  }

  async function handleDeleteGroupMessages(idForDelete: string) {
    
    dispatch(setIsLoading(true));
    try {
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", idForDelete);
      if (error) {
        console.error(error);
        throw new Error("Group Messages could not be deleted");
      }
      // dispatch(setGroupMessages(updatedMessages));
    } catch (error) {
      console.error("Error deleting group message:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }
 //console.log("team80 = ",team);
  const searchedGroupMessages = searchedGroupMessagesFunc(
    team.messages || [],
    searchMessage
  );
 
  return (
    <div className="profile-wrapper">
      <div className="user-profile-container">
        <div className="chat-with">
          <div>
            <div style={{ display: "flex", gap: "5px" }}>
              <Avatar name={team.name || ""} />
              <h4>{`${team.name} `}</h4>
            </div>
            <p style={{ fontSize: "10px", textAlign: "center" }}>
              members: {team.members.map((user) => user.username).join(",")}
            </p>
          </div>
          <SearchInMessage />
           <img
        style={{ maxWidth: "13%" }}
        src="https://img.freepik.com/premium-photo/two-cheerful-young-girls-using-smartphone-while-sitting-cafe-outdoors_650366-3065.jpg?w=900"
       // src="https://cpkaumakwusyxhmexnqr.supabase.co/storage/v1/object/public/messages-images/cabin-001.jpg"
        alt="some cabin"
      />
        </div>
        <UserMessagesContainer
          loggedInUser={loggedInUser}
          userInListId={groupInListId}
          handleDeleteMessages={handleDeleteGroupMessages}
          searchedMessages={searchedGroupMessages}
        />       

        {!isEdit ? (
          <SendUserMessage
          newMessage={newGroupMessage}
          setNewMessage={setNewGroupMessage}
          handleSendMessage={handleSendGroupMessage}
          />
        ) : (
          <EditUserMessage />
        )}
      </div>
    </div>
  );
}