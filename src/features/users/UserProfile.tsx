import { setMessages, addMessage } from "./userSlice";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import SearchInMessage from "./SearchInMessage";
import Avatar from "./Avatar";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useAppSelector } from "../../store";
const API_URL = "http://localhost:3001";

function UserProfile({ ChatContext }) {
  const dispatch = useDispatch();
  const { searchMessage, loggedInUser, messages, users } = useAppSelector(
    (store) => store.user
  );

  const [newMessage, setNewMessage] = useState("");
  const params = useParams();
  const userInListId = params.userId;
  const userName = users.find((x) => x.id === userInListId).username;

  function leftMessage(message) {
    return (
      message.receiverId === loggedInUser.id &&
      message.senderId === userInListId
    );
  }

  function rightMessage(message) {
    return (
      message.receiverId === userInListId &&
      message.senderId === loggedInUser.id
    );
  }

  const userMessages = messages.filter(
    (message) => leftMessage(message) || rightMessage(message)
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
        senderId: loggedInUser.id,
        receiverId: userInListId,
        senderUsername: loggedInUser.username,
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

  function handleDeleteMessages(idForDelete) {
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
      <div className="chat-with">
        <Avatar name={userName ? userName : ""} />
        <h4>{userName ? userName : ""}</h4>
        <SearchInMessage ChatContext={ChatContext} />
      </div>
      <div className="user-profile-container">
        <ul className="messages-container">
          {searchedMessage.map((message, index) => (
            <div
              className={` ${
                rightMessage(message) ? "message-right" : "message-left"
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
                {rightMessage(message) ? (
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
export default UserProfile;
