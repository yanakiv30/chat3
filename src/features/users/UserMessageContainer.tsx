import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { rightMessage } from "../../utils/messageUtils";
import { setIsEdit, setMesContent, setMessageId } from "./userSlice";
import { useAppSelector } from "../../store";
import { Message } from "../groups/groupSlice";
import getImageUrl from "../../utils/getImageUrl";
import deleteImage from "../../utils/deleteImage";

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

  async function handleDeleteMessageWithImage(
    messageId: number,
    imagePath?: string
  ) {
    if (imagePath) {
      const imageDeleted = await deleteImage(imagePath);
      if (!imageDeleted) {
        console.error("Failed to delete image");
        return;
      }
    }
    handleDeleteMessages(messageId);
  }

  function editOnId(messageId: number) {
    dispatch(setMessageId(messageId));
    dispatch(setIsEdit(true));
  }

  return (
    <ul className="messages-container">
      {searchedMessages.map((message: Message, index) => {
        return (
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
                <div style={{ width: "150px", height: "150px" }}>
                  <img
                    src={getImageUrl(message.image_path) || undefined}
                    alt="Uploaded"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                </div>
              )}

              <div
                style={{ width: "150px", height: "100px", overflow: "auto" }}
              >
                <p style={{ color: "blue" }}>
                  {
                    users.filter((user) => user.id === message.senderId)[0]
                      .username
                  }
                  :
                </p>
                <p style={{ width: "100%" }}>{message.content}</p>
                <br />
                <p className="date">{message.hourMinDate}</p>
                {rightMessage(message, loggedInUser, userInListId) && (
                  <div style={{ display: "flex", gap: "7px" }}>
                    <button
                      className="date"
                      onClick={() => editOnId(message.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="date"
                      onClick={() =>
                        handleDeleteMessageWithImage(
                          message.id,
                          message.image_path
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          </div>
        );
      })}
    </ul>
  );
}
