import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
const API_URL = "http://localhost:3001";

export default function GroupProfile({ChatContext}) {
  const {groups,loggedInUser} = useContext(ChatContext);
const[groupMessages, setGroupMessages] = useState([]);
  const [newGroupMessage, setNewGroupMessage] = useState("");
  const params = useParams();
  const groupInListId = params.groupId;
  const grName = groups.find((x) => x.id === groupInListId)?.name;


  function handleSendGroupMessage() {
    if (newGroupMessage.trim() !== "") {
      const currentDate = new Date();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const hourMinDate = `${hours}:${minutes.toString().padStart(2, "0")}`;
      const dayDate = `${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`;

      const newGroupMessageObject = {
        id: uuid(),
        senderId: loggedInUser.id,
        receiverId: groupInListId,       
        content: newGroupMessage,
        hourMinDate,
        dayDate,
      };

      fetch(`${API_URL}/groupMessages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGroupMessageObject),
      })
        .then((response) => response.json())
        .then((data) => setGroupMessages([...groupMessages, data]))
        .catch((error) => console.error("Error posting message:", error));

      setNewGroupMessage("");
    }
  }


  return (
    <div className="profile-wrapper">
      <div className="chat-with">
        <h3>{`Chat with ${grName}`}</h3>
      </div>
      <div className="user-profile-container">
      <div className="message-send">
          <input
            type="text"
            value={newGroupMessage}
            onChange={(e) => setNewGroupMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSendGroupMessage();
              }
            }}
            placeholder="Type your message..."
          />
          <button onClick={handleSendGroupMessage}>Send</button>
        </div>

      </div>
    </div>
  );
}
