import { useContext, useState} from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import SearchUser from "./SearchUser";
const API_URL = "http://localhost:3001";

function UserProfile({ChatContext}) {
  const {setMessages, loggedInUser, messages, users} = useContext(ChatContext);

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

  const largeMessages = messages.filter(
    (message) => leftMessage(message) || rightMessage(message));
   const  userMessages= largeMessages
   .slice(Math.max(largeMessages.length - 10, 0)); //messages<10
  //

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMessageObject = {
        id: uuid(),
        senderId: loggedInUser.id,
        receiverId: userInListId,
        senderUsername: loggedInUser.username,
        content: newMessage,
      };

      fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessageObject),
      })
        .then((response) => response.json())
        .then((data) => setMessages([...messages, data]))
        .catch((error) => console.error("Error posting message:", error));

      setNewMessage("");
    }
  };

  return (
    <div className="profile-wrapper">
      <SearchUser ChatContext={ChatContext}/>
      <div className="chat-with">
        <h3> Chat with {userName}</h3>
      </div>
      <div className="user-profile-container">
        <ul className="messages-container">
          {userMessages.map((message) => (
            <li
              className={`message ${
                leftMessage(message) ? "message-left" : "message-right"
              }`}
              key={message.id}
            >
              <strong>{message.senderUsername}:</strong> {message.content}
            </li>
          ))}
        </ul>

        <div className="message-send">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>

        </div>
      </div>
    </div>
  );
}
export default UserProfile;
