import { rightMessage, searchedGroupMessagesFunc } from "../../utils/messageUtils";

export default function GroupMessagesContainer({groupMessages, loggedInUser,groupInListId,
     groups,searchMessage,handleDeleteGroupMessages}:any) {

const searchedGroupMessages = searchedGroupMessagesFunc(groupMessages, loggedInUser,
    groupInListId, groups,searchMessage);

    return(
       <ul className="messages-container">
          {searchedGroupMessages.map((groupMessage, index) => (
            <div
              className={` ${
                rightMessage(groupMessage,loggedInUser,groupInListId)
                  ? "message-right"
                  : "message-left"
              }`}
              key={groupMessage.id}
            >
              <p className="day-date">
                {searchedGroupMessages[index - 1]?.dayDate ===
                searchedGroupMessages[index].dayDate
                  ? ""
                  : groupMessage.dayDate}
              </p>
              <br></br>
              <li className="message">
                <p style={{ color: "blue" }}>{groupMessage.senderUsername}:</p>
                <p>{groupMessage.content}</p>

                <br></br>
                <p className="date">{groupMessage.hourMinDate}</p>
                {rightMessage(groupMessage,loggedInUser,groupInListId) ? (
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
    )
}