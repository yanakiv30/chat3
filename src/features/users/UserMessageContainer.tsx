import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { rightMessage } from "../../utils/messageUtils";
import { setIsEdit, setMesContent, setMessageId } from "./userSlice";
import { useAppSelector } from "../../store";
import { Message } from "../groups/groupSlice";
import getImageUrl from "../../utils/getImageUrl";
import deleteImage from "../../utils/deleteImage"; // Import the deleteImage function

export default function UserMessagesContainer({
  loggedInUser,
  userInListId,
  handleDeleteMessages,
  searchedMessages,
}: any) {
  const dispatch = useDispatch();
  const { messageId, users } = useAppSelector((store) => store.user);

  useEffect(() => {
    const messageContent = searchedMessages.filter(
      (message: any) => message.id === messageId
    )[0]?.content;

    dispatch(setMesContent(messageContent));
  }, [messageId, searchedMessages, dispatch]);

  if (!Array.isArray(searchedMessages)) {
    return <div>No messages found</div>;
  }

  function editOnId(messageId: number) {
    dispatch(setMessageId(messageId));
    dispatch(setIsEdit(true));
  }

  // Update the handleDeleteMessages to include image deletion
  const handleDelete = async (message: Message) => {
    if (message.image_path) {
      const success = await deleteImage(message.image_path);
      if (!success) {
        console.error("Failed to delete image");
        return;
      }
    }
    handleDeleteMessages(message.id); // Call the original delete message function
  };

  return (
    <ul className="messages-container">
      {searchedMessages.map((message: Message, index) => (
        <div
          className={`${
            rightMessage(message, loggedInUser, userInListId)
              ? "message-right"
              : "message-left"
          }`}
          key={message.id}
        >
          <p className="day-date">
            {searchedMessages[index - 1]?.dayDate ===
            searchedMessages[index].dayDate
              ? ""
              : message.dayDate}
          </p>
          <br />

          

          <li className="message">

          {message.image_path && (
            <div style={{ width: "100px", height: "100px" }}>
              <img
                src={getImageUrl(message.image_path) || undefined}
                alt="Uploaded"
                style={{ maxWidth: "100%", marginTop: "10px" }}
              />
            </div>
          )}

            <div>
              <p style={{ color: "blue" }}>
                {
                  users.filter((user) => user.id === message.senderId)[0]
                    .username
                }
                :
              </p>
              <p>{message.content}</p>
              <br />
              <p className="date">{message.hourMinDate}</p>
              {rightMessage(message, loggedInUser, userInListId) && (
                <div style={{ display: "flex", gap: "7px" }}>
                  <button className="date" onClick={() => editOnId(message.id)}>
                    Edit
                  </button>
                  <button
                    className="date"
                    onClick={() => handleDelete(message)} // Update to pass the whole message
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </li>
        </div>
      ))}
    </ul>
  );
}

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { rightMessage } from "../../utils/messageUtils";
// import { setIsEdit, setMesContent, setMessageId } from "./userSlice";
// import { useAppSelector } from "../../store";
// import { Message } from "../groups/groupSlice";
// import getImageUrl from "../../utils/getImageUrl";

// interface UserMessagesContainerProps {
//   loggedInUser: any;
//   userInListId: number;
//   handleDeleteMessages: (idForDelete: string) => void;
//   searchedMessages: Message[];
// }

// export default function UserMessagesContainer({
//   loggedInUser,
//   userInListId,
//   handleDeleteMessages,
//   searchedMessages,
// }: UserMessagesContainerProps) {
//   const dispatch = useDispatch();
//   const { messageId, users } = useAppSelector((store) => store.user);

//   useEffect(() => {
//     const messageContent = searchedMessages.filter(
//       (message: any) => message.id === messageId
//     )[0]?.content;

//     dispatch(setMesContent(messageContent));
//   }, [messageId, searchedMessages, dispatch]);

//   if (!Array.isArray(searchedMessages)) {
//     return <div>No messages found</div>;
//   }

//   function editOnId(messageId: number) {
//     dispatch(setMessageId(messageId));
//     dispatch(setIsEdit(true));
//   }

//   return (
//     <ul className="messages-container">
//       {searchedMessages.map((message: Message, index) => (
//         <div
//           className={`${
//             rightMessage(message, loggedInUser, userInListId)
//               ? "message-right"
//               : "message-left"
//           }`}
//           key={message.id}
//         >
//           <p className="day-date">
//             {searchedMessages[index - 1]?.dayDate ===
//             searchedMessages[index].dayDate
//               ? ""
//               : message.dayDate}
//           </p>
//           <br />
//           <li className="message">
//             <p style={{ color: "blue" }}>
//               {users.filter((user) => user.id === message.senderId)[0].username}
//               :
//             </p>
//             <p>{message.content}</p>
//             {message.image_path && (
//               <img
//                 src={getImageUrl(message.image_path)}
//                 alt="Uploaded"
//                 style={{ maxWidth: "100%", marginTop: "10px" }}
//               />
//             )}
//             <br />
//             <p className="date">{message.hourMinDate}</p>
//             {rightMessage(message, loggedInUser, userInListId) && (
//               <div style={{ display: "flex", gap: "7px" }}>
//                 <button className="date" onClick={() => editOnId(message.id)}>
//                   Edit
//                 </button>
//                 <button
//                   className="date"
//                   onClick={() => handleDeleteMessages(message.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </li>
//         </div>
//       ))}
//     </ul>
//   );
// }
