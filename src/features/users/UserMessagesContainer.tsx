import { useDispatch } from "react-redux";
import { rightMessage } from "../../utils/messageUtils";
import { setIsEdit, setMesContent, setMessageId } from "./userSlice";
import { useAppSelector } from "../../store";

export default function UserMessagesContainer({
  loggedInUser,
  userInListId,
  handleEditMessages,
  handleDeleteMessages,
  searchedMessage,
}: any) {

  const { messageId,mesContent,messages } = useAppSelector((store) => store.user);
  const dispatch = useDispatch();
 
  
  if (!Array.isArray(searchedMessage)) {
    return <div>No messages found</div>;
  }
  function editOnId(messageId: string) {
    console.log("messageId", messageId);
    dispatch(setMessageId(messageId));
    console.log(mesContent);
    dispatch(setIsEdit(true));
  }

  const messageContent = messages.filter(
    (message) => message.id === messageId
  )[0]?.content;
  dispatch(setMesContent(messageContent));

  console.log("messageId", messageId);
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
              <div style={{ display: "flex", gap: "7px" }}>
                <button
                  className="date"
                  onClick={() => editOnId(message.id)} //() =>handleEditMessages(message.id)
                >
                  Edit
                </button>

                <button
                  className="date"
                  onClick={() => handleDeleteMessages(message.id)} //
                >
                  Delete
                </button>
              </div>
            ) : null}
          </li>
        </div>
      ))}
    </ul>
  );
}
