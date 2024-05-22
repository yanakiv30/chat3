import { useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import SearchInMessage from "../features/users/SearchInMessage";
import Avatar from "../features/users/Avatar";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../store";

import SendUserMessage from "../features/users/SendUserMessage";
import { searchedGroupMessagesFunc } from "../utils/messageUtils";
import UserMessagesContainer from "../features/users/UserMessageContainer";
import { setIsLoading } from "../features/users/userSlice";
import supabase from "../services/supabase";


export default function GroupMessages() {
  const { loggedInUser, searchMessage } = useAppSelector((store) => store.user);
  const { teams } = useAppSelector((store) => store.group);
  const [newGroupMessage, setNewGroupMessage] = useState("");
  const params = useParams();
  const groupInListId = +params.groupId!;
  const team = teams.find((x) => x.id === groupInListId)!;
  const dispatch = useDispatch();

  async function handleSendGroupMessage() {
    // if (newGroupMessage.trim() !== "") {
    //   const currentDate = new Date();
    //   const hours = currentDate.getHours();
    //   const minutes = currentDate.getMinutes();
    //   const hourMinDate = `${hours}:${minutes.toString().padStart(2, "0")}`;
    //   const dayDate = `${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`;

    //   const newGroupMessageObject = {
    //     id: uuid(),
    //     senderId: loggedInUser!.id,
    //     receiverId: groupInListId,
    //     senderUsername: loggedInUser!.username,
    //     content: newGroupMessage,
    //     hourMinDate,
    //     dayDate,
    //   };

    //   dispatch(setIsLoading(true));
    //   try {
    //     const { data, error } = await supabase
    //       .from("groupMessages0")
    //       .insert(newGroupMessageObject)
    //       .select();
    //     if (error) {
    //       console.error(error);
    //       throw new Error("Group Messages could not be loaded");
    //     }
    //    // dispatch(addGroupMessage(data));
    //   } catch (error) {
    //     console.error("Error creating Group message:", error);
    //   } finally {
    //     dispatch(setIsLoading(false));
    //   }
    //   setNewGroupMessage("");
    // }
  }

  async function handleDeleteGroupMessages(idForDelete: string) {
    //const updatedMessages = groupMessages.filter((x) => x.id !== idForDelete);

    dispatch(setIsLoading(true));
    try {
      const { error } = await supabase
        .from("groupMessages0")
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
              {/* members: {groupMemebers!.join(", ")} */}
            </p>
          </div>
          <SearchInMessage />
        </div>
        <UserMessagesContainer
          loggedInUser={loggedInUser}
          userInListId={groupInListId}
          handleDeleteMessages={handleDeleteGroupMessages}
          searchedMessage={searchedGroupMessages}
        />

        <SendUserMessage
          newMessage={newGroupMessage}
          setNewMessage={setNewGroupMessage}
          handleSendMessage={handleSendGroupMessage}
        />
      </div>
    </div>
  );
}
