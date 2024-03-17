import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
const API_URL = "http://localhost:3001";

export default function GroupProfile({ChatContext}) {
  const {groups,loggedInUser,groupMessages,setGroupMessages} = useContext(ChatContext);

  const [newGroupMessage, setNewGroupMessage] = useState("");
  const params = useParams();
  const groupInListId = params.groupId;
  const grName = groups.find((x) => x.id === groupInListId)?.name;

  function leftGroupMessage(groupMessage) {
    return (      
      groupMessage.senderId === groupInListId
    );
  }

  function rightGroupMessage(groupMessage) {
    return (
      groupMessage.receiverId === groupInListId &&
      groupMessage.senderId === loggedInUser.id
    );
  }

  const userGroupMessages = groupMessages.filter(
    (groupMessage) => leftGroupMessage(groupMessage) ||
     rightGroupMessage(groupMessage)
  );

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
        senderUsername: loggedInUser.username,
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

      <ul className="messages-container">
          {groupMessages.map((groupMessage, index) => (
            <div
              className={` ${
                rightGroupMessage(groupMessage) ? "message-right" : "message-left"
              }`}
              key={groupMessage.id}
            >
              <p className="day-date">
                {groupMessages[index - 1]?.dayDate ===
                groupMessages[index].dayDate
                  ? ""
                  : groupMessage.dayDate}
              </p>
              <br></br>
              <li className="message">
                <p>
                  <strong>{groupMessage.senderUsername}:</strong> {groupMessage.content}
                </p>
                <br></br>
                <p className="date">{groupMessage.hourMinDate}</p>
                {/* {rightGroupMessage(groupMessage) ? (
                  <button
                    className="date"
                    onClick={() => handleDeleteMessages(message.id)}
                  >
                    Delete
                  </button>
                ) : null} */}
              </li>
            </div>
          ))}
        </ul>

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
