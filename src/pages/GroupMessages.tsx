import { useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import SearchInMessage from "../features/users/SearchInMessage";
import Avatar from "../features/users/Avatar";
import {
  setGroupMessages,
  addGroupMessage,
} from "../features/groups/groupSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store";

import SendUserMessage from "../features/users/SendUserMessage";
import { searchedGroupMessagesFunc } from "../utils/messageUtils";
import UserMessagesContainer from "../features/users/UserMessagesContainer";
import { setIsLoading } from "../features/users/userSlice";
import supabase from "../services/supabase";
const API_URL = "http://localhost:3001";

export default function GroupMessages() {
  const { loggedInUser, searchMessage } = useAppSelector((store) => store.user);
  const { groups, groupMessages } = useAppSelector((store) => store.group);
  const [newGroupMessage, setNewGroupMessage] = useState("");
  const params = useParams();
  const groupInListId = params.groupId;
  const grName = groups.find((x) => x.id === groupInListId)?.name;
  const groupMemebers = groups.find((x) => x.id === groupInListId)?.members;
  const dispatch = useDispatch();   

  async function handleSendGroupMessage() {
    if (newGroupMessage.trim() !== "") {
      const currentDate = new Date();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const hourMinDate = `${hours}:${minutes.toString().padStart(2, "0")}`;
      const dayDate = `${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`;

      const newGroupMessageObject = {
        id: uuid(),
        senderId: loggedInUser!.id,
        receiverId: groupInListId,
        senderUsername: loggedInUser!.username,
        content: newGroupMessage,
        hourMinDate,
        dayDate,
      };

      dispatch(setIsLoading(true));      
      try {
        const { data, error } = await supabase 
          .from("messages")
          .insert(newGroupMessageObject)
          .select();
        if (error) {
          console.error(error);
          throw new Error("Messages could not be loaded");
        }
        dispatch(addGroupMessage(data));
      } catch (error) {
        console.error("Error posting message:", error);
      } finally {
        dispatch(setIsLoading(false));
      }      

      
      // fetch(`${API_URL}/groupMessages`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(newGroupMessageObject),
      // })
      //   .then((response) => response.json())
      //   .then((data) => dispatch(addGroupMessage(data))) //setGroupMessages(data)
      //   .catch((error) => console.error("Error posting message:", error));

      setNewGroupMessage("");
    }
  }

  async function handleDeleteGroupMessages(idForDelete: string) {
    const updatedMessages = groupMessages.filter((x) => x.id !== idForDelete);
    dispatch(setGroupMessages(updatedMessages));

    dispatch(setIsLoading(true));
    try{
    const { error } = await supabase
    .from('groupMessages')
    .delete()
    .eq('id', idForDelete)
    if (error) {
      console.error(error);
      throw new Error("Group Messages could not be deleted");
    }
    dispatch(setGroupMessages(updatedMessages));
  } catch (error) {
    console.error("Error deleting group message:", error);
  } finally {
    dispatch(setIsLoading(false));
  }

    
    // fetch(`${API_URL}/groupMessages/${idForDelete}`, {
    //   method: "DELETE",
    // })
    //   .then((response) => response.json())
    //   .then(() => {
    //     dispatch(setGroupMessages(updatedMessages));
    //   })
    //   .catch((error) => console.error("Error deleting message:", error));
  }

  const searchedGroupMessages = searchedGroupMessagesFunc(groupMessages, 
    loggedInUser,groupInListId, groups,searchMessage);
    
  return (
    <div className="profile-wrapper">
      <div className="user-profile-container">
        <div className="chat-with">
          <div>
            <div style={{ display: "flex", gap: "5px" }}>
              <Avatar name={grName || ""} />
              <h4>{`${grName} `}</h4>
            </div>
            <p style={{ fontSize: "10px", textAlign: "center" }}>
              members: {groupMemebers!.join(", ")}{" "}
            </p>
          </div>
          <SearchInMessage />
        </div>
        <UserMessagesContainer  loggedInUser={loggedInUser} userInListId={groupInListId} 
        handleDeleteMessages={handleDeleteGroupMessages}
        searchedMessage={searchedGroupMessages}/>
         
        <SendUserMessage newMessage={newGroupMessage} setNewMessage={setNewGroupMessage}
         handleSendMessage={handleSendGroupMessage}/>
        
      </div>
    </div>
  );
}
