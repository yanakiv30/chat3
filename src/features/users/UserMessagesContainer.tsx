import { rightMessage, searchedMessageFunc } from "../../utils/messageUtils";

export default function UserMessagesContainer({messages,loggedInUser, 
  userInListId, searchMessage, handleDeleteMessages}:any) {
  const searchedMessage = searchedMessageFunc(
    messages,
    loggedInUser,
    userInListId,
    searchMessage
  );

  return (
    <ul className="messages-container">
      {searchedMessage.map((message, index) => (
        <div
          className={` ${
            rightMessage(message, loggedInUser, userInListId)
              ? "message-right"
              : "message-left"
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
            {rightMessage(message, loggedInUser, userInListId) ? (
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
  );
}
