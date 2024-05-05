import {
  setMessages,
  addMessage,
  setIsLoading,
  setIsEdit,
} from "../features/users/userSlice";
import { useParams } from "react-router-dom";
import SearchInMessage from "../features/users/SearchInMessage";
import Avatar from "../features/users/Avatar";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useAppSelector } from "../store";
import {
  newMessageObjectFunc,
  searchedMessageFunc,
} from "../utils/messageUtils";
import UserMessagesContainer from "../features/users/UserMessagesContainer";
import SendUserMessage from "../features/users/SendUserMessage";
import supabase from "../services/supabase";
import EditUserMessage from "../features/users/EditUserMessage";

function UserMessages() {
  const dispatch = useDispatch();
  const { searchMessage, loggedInUser, isLoading, messages, users, isEdit } =
    useAppSelector((store) => store.user);
  const [newMessage, setNewMessage] = useState("");

  const params = useParams();
  const userInListId = params.userId;
  const userName = users.find((x) => x.id === userInListId)?.username;

  async function handleSendMessage() {
    if (newMessage.trim() !== "") {
      const newMessageObject = newMessageObjectFunc(
        loggedInUser,
        userInListId,
        newMessage
      );

      dispatch(setIsLoading(true));
      try {
        const { data, error } = await supabase
          .from("messages")
          .insert(newMessageObject)
          .select();
        if (error) {
          console.error(error);
          throw new Error("Messages could not be loaded");
        }
        dispatch(addMessage(data));
      } catch (error) {
        console.error("Error posting message:", error);
      } finally {
        dispatch(setIsLoading(false));
      }

      setNewMessage("");
    }
  }

  async function handleEditMessages(idForEdit: string) {
    // dispatch(setIsEdit(true));
    //const updatedMessages = messages.filter((x) => x.id !== idForEdit);
    //dispatch(setMessages(updatedMessages));
    console.log(idForEdit);
    dispatch(setIsLoading(true));
    try {
      const { error } = await supabase
        .from("messages")
        .update({content: "updated content" })
        .eq("id", idForEdit)
        .select();
      if (error) {
        console.error(error);
        throw new Error("Message could not be edited");
      }
    } catch (error) {
      console.error("Error editing message:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }
  async function handleDeleteMessages(idForDelete: string) {
    const updatedMessages = messages.filter((x) => x.id !== idForDelete);
    // dispatch(setMessages(updatedMessages));

    dispatch(setIsLoading(true));
    try {
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", idForDelete);
      if (error) {
        console.error(error);
        throw new Error("Messages could not be deleted");
      }
      //dispatch(setMessages(updatedMessages));
    } catch (error) {
      console.error("Error deleting message:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  const searchedMessage = searchedMessageFunc(
    messages,
    loggedInUser,
    userInListId,
    searchMessage
  );

  return (
    <div className="profile-wrapper">
      <div className="user-profile-container">
        <div className="chat-with">
          <Avatar name={userName ? userName : ""} />
          <h4>{userName ? userName : ""}</h4>
          <SearchInMessage />
        </div>
        <UserMessagesContainer
          loggedInUser={loggedInUser}
          userInListId={userInListId}
          handleEditMessages={handleEditMessages}
          handleDeleteMessages={handleDeleteMessages}
          searchedMessage={searchedMessage}
        />
        {!isEdit ? (
          <SendUserMessage
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
          />
        ) : (
          <EditUserMessage
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleEditMessage={handleSendMessage}
          />
        )}
      </div>
    </div>
  );
}
export default UserMessages;
