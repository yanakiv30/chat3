import {
  setMessages,
  addMessage,
  setIsLoading,
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
const API_URL = "http://localhost:3001";

function UserMessages() {
  const dispatch = useDispatch();
  const { searchMessage, loggedInUser, isLoading, messages, users } =
    useAppSelector((store) => store.user);
  const [newMessage, setNewMessage] = useState("");
  const params = useParams();
  const userInListId = params.userId;
  const userName = users.find((x) => x.id === userInListId)?.username;
 console.log("isLoading-1 : ",isLoading);
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
      // fetch(`${API_URL}/messages`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(newMessageObject),
      // })
      //   .then((response) => response.json())
      //   .then((data) => dispatch(addMessage(data)))
      //   .catch((error) => console.error("Error posting message:", error));
      setNewMessage("");
    }
  }

  async function handleDeleteMessages(idForDelete: string) {
    const updatedMessages = messages.filter((x) => x.id !== idForDelete);
    dispatch(setMessages(updatedMessages));

    dispatch(setIsLoading(true));
    try{
    const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', idForDelete)
    if (error) {
      console.error(error);
      throw new Error("Messages could not be deleted");
    }
    dispatch(setMessages(updatedMessages));
  } catch (error) {
    console.error("Error deleting message:", error);
  } finally {
    dispatch(setIsLoading(false));
  }
    // fetch(`${API_URL}/messages/${idForDelete}`, {
    //   method: "DELETE",
    // })
    //   .then((response) => response.json())
    //   .then(() => {
    //     dispatch(setMessages(updatedMessages));
    //   })
    //   .catch((error) => console.error("Error deleting message:", error));
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
          handleDeleteMessages={handleDeleteMessages}
          searchedMessage={searchedMessage}
        />
        <SendUserMessage
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
export default UserMessages;
