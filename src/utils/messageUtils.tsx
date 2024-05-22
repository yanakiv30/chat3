import { v4 as uuid } from "uuid";
import { Message } from "../features/groups/groupSlice";
import { User } from "../features/users/userSlice";

export function leftGroupMessage(
  groupMessage: Message,
  loggedInUser: User | null,
  groupInListId: number | undefined,
  groups: {
    name: string;
    id: number;
    members: [string];
    admin: string;
  }[]
) {
  return (
    // groupMessage.receiverId === groupInListId &&
    groups
      .filter((group) => group.id === groupInListId)[0]
      .members.includes(loggedInUser!.username)
  );
}

export function leftMessage(
  message: Message,
  loggedInUser: User | null,
  userInListId: number | undefined
) {
  return message.senderId === userInListId;
}

export function rightMessage(
  message: Message,
  loggedInUser: User | null,
  userInListId: string | undefined
) {
  return message.senderId === loggedInUser!.id;
}

export function searchedMessageFunc(
  messages: Message[],
  loggedInUser: User | null,
  userInListId: string | undefined,
  searchMessage: string
) {
  return messages.filter((userMessage) =>
    userMessage.content.includes(searchMessage)
  );
}

export function newMessageObjectFunc(
  loggedInUser: User | null,
  userInListId: string | undefined,
  newMessage: string
) {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const hourMinDate = `${hours}:${minutes.toString().padStart(2, "0")}`;
  const dayDate = `${currentDate.getDate()}
    .${currentDate.getMonth()}.${currentDate.getFullYear()}`;
  const newMessageObject = {
    id: uuid(),
    senderId: loggedInUser!.id,
    receiverId: userInListId,
    senderUsername: loggedInUser!.username,
    content: newMessage,
    hourMinDate,
    dayDate,
  };
  return newMessageObject;
}

export function searchedGroupMessagesFunc(
  groupMessages: Message[],  
  searchMessage: string
) {
  return groupMessages.filter((groupMessage) =>
    groupMessage.content.includes(searchMessage)
  );
}
