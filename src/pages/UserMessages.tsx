import { setMessages, addMessage } from "../features/users/userSlice";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import SearchInMessage from "../features/users/SearchInMessage";
import Avatar from "../features/users/Avatar";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useAppSelector } from "../store";
import { leftMessage, rightMessage } from "../utils/messageUtils";
const API_URL = "http://localhost:3001";

function UserMessages() {
  const dispatch = useDispatch();
  const { searchMessage, loggedInUser,messages, users } = useAppSelector(
    (store) => store.user
  );

  const [newMessage, setNewMessage] = useState("");
  const params = useParams();
  const userInListId = params.userId;
  const userName = users.find((x) => x.id === userInListId)?.username;

  

  

  const userMessages = messages.filter(
    (message) => leftMessage(message,loggedInUser,userInListId) || rightMessage(message,loggedInUser,userInListId)
  );

  const searchedMessage = userMessages.filter((userMessage) =>
    userMessage.content.includes(searchMessage)
  );

  function handleSendMessage() {
    if (newMessage.trim() !== "") {
      const currentDate = new Date();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const hourMinDate = `${hours}:${minutes.toString().padStart(2, "0")}`;
      const dayDate = `${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`;

      const newMessageObject = {
        id: uuid(),
        senderId: loggedInUser!.id,
        receiverId: userInListId,
        senderUsername: loggedInUser!.username,
        content: newMessage,
        hourMinDate,
        dayDate,
      };

      fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessageObject),
      })
        .then((response) => response.json())
        .then((data) => dispatch(addMessage(data)))
        .catch((error) => console.error("Error posting message:", error));

      setNewMessage("");
    }
  }

  function handleDeleteMessages(idForDelete: string) {
    const updatedMessages = messages.filter((x) => x.id !== idForDelete);
    dispatch(setMessages(updatedMessages));

    fetch(`${API_URL}/messages/${idForDelete}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        dispatch(setMessages(updatedMessages));
      })
      .catch((error) => console.error("Error deleting message:", error));
  }

  return (
    <div className="profile-wrapper">
      <div className="user-profile-container">
        <div className="chat-with">
          <Avatar name={userName ? userName : ""} />
          <h4>{userName ? userName : ""}</h4>
          <SearchInMessage />
        </div>

        <ul className="messages-container">
          {searchedMessage.map((message, index) => (
            <div
              className={` ${
                rightMessage(message,loggedInUser,userInListId) ? "message-right" : "message-left"
              }`}
              key={message.id}
            >
              <p className="day-date">
                {searchedMessage[index - 1]?.dayDate ===
                searchedMessage[index].dayDate
                  ? ""
                  : message.dayDate}
              </p>
              <br></br>
              <li className="message">
                <p style={{ color: "blue" }}>{message.senderUsername}:</p>
                <p> {message.content}</p>
                <br></br>
                <p className="date">{message.hourMinDate}</p>
                {rightMessage(message,loggedInUser,userInListId) ? (
                  <button
                    className="date"
                    onClick={() => handleDeleteMessages(message.id)}
                  >
                    Delete
                  </button>
                ) : null}
              </li>
            </div>
          ))}
        </ul>

        <div className="message-send">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
export default UserMessages;
