import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import SearchInMessage from "../users/SearchInMessage";
import Avatar from "../users/Avatar";
const API_URL = "http://localhost:3001";

export default function GroupProfile({ ChatContext }) {
  const {
    groups,
    loggedInUser,
    groupMessages,
    setGroupMessages,
    searchMessage,
  } = useContext(ChatContext);

  const [newGroupMessage, setNewGroupMessage] = useState("");
  const params = useParams();
  const groupInListId = params.groupId;
  const grName = groups.find((x) => x.id === groupInListId)?.name;
  const groupMemebers = groups.find((x) => x.id === groupInListId)?.members;

  function leftGroupMessage(groupMessage) {
    return (
      groupMessage.receiverId === groupInListId &&
      groups
        .filter((group) => group.id === groupInListId)[0]
        .members.includes(loggedInUser.username)
    );
  }

  function rightGroupMessage(groupMessage) {
    return (
      groupMessage.receiverId === groupInListId &&
      groupMessage.senderId === loggedInUser.id
    );
  }

  const userGroupMessages = groupMessages.filter(
    (groupMessage) =>
      (leftGroupMessage(groupMessage) || rightGroupMessage(groupMessage)) &&
      groupMessage.content.includes(searchMessage)
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

  function handleDeleteGroupMessages(idForDelete) {
    const updatedMessages = groupMessages.filter((x) => x.id !== idForDelete);
    setGroupMessages(updatedMessages);

    fetch(`${API_URL}/groupMessages/${idForDelete}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setGroupMessages(updatedMessages);
      })
      .catch((error) => console.error("Error deleting message:", error));
  }

  return (
    <div className="profile-wrapper">
      <div className="chat-with">
        <div>
          <div style={{ display: "flex", gap: "5px" }}>
            <Avatar name={grName} />
            <h4>{`${grName} `}</h4>
          </div>
          <p style={{ fontSize: "10px", textAlign: "center" }}>
            members: {groupMemebers.join(", ")}{" "}
          </p>
        </div>

        <SearchInMessage ChatContext={ChatContext} />
      </div>
      <div className="user-profile-container">
        <ul className="messages-container">
          {userGroupMessages.map((groupMessage, index) => (
            <div
              className={` ${
                rightGroupMessage(groupMessage)
                  ? "message-right"
                  : "message-left"
              }`}
              key={groupMessage.id}
            >
              <p className="day-date">
                {userGroupMessages[index - 1]?.dayDate ===
                userGroupMessages[index].dayDate
                  ? ""
                  : groupMessage.dayDate}
              </p>
              <br></br>
              <li className="message">
                <p style={{ color: "blue" }}>{groupMessage.senderUsername}:</p>
                <p>{groupMessage.content}</p>

                <br></br>
                <p className="date">{groupMessage.hourMinDate}</p>
                {rightGroupMessage(groupMessage) ? (
                  <button
                    className="date"
                    onClick={() => handleDeleteGroupMessages(groupMessage.id)}
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
