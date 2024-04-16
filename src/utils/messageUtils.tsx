import { v4 as uuid } from "uuid";

export function leftGroupMessage(
  groupMessage: { id: string; receiverId: string },
  loggedInUser: {
    username: string;
    id: string;
  } | null,
  groupInListId: string | undefined,
  groups: {
    name: string;
    id: string;
    members: [string];
    admin: string;
  }[]
) {
  return (
    groupMessage.receiverId === groupInListId &&
    groups
      .filter((group) => group.id === groupInListId)[0]
      .members.includes(loggedInUser!.username)
  );
}

export function leftMessage(
  message: {
    id: string;
    senderId: string;
    receiverId: string;
  },
  loggedInUser: {
    username: string;
    id: string;
  } | null,
  userInListId: string | undefined
) {
  return (
    message.receiverId === loggedInUser!.id && message.senderId === userInListId
  );
}

export function rightMessage(
  message: {
    id: string;
    senderId: string;
    receiverId: string;
  },
  loggedInUser: {
    username: string;
    id: string;
  } | null,
  userInListId: string | undefined
) {
  return (
    message.receiverId === userInListId && message.senderId === loggedInUser!.id
  );
}

export function searchedMessageFunc(
  messages: {
    id: string;
    senderId: string;
    receiverId: string;
    senderUsername: string;
    content: string;
    hourMinDate: string;
    dayDate: string;
  }[],
  loggedInUser: {
    username: string;
    id: string;
  } | null,
  userInListId: string | undefined,
  searchMessage: string
) {
  return messages
    .filter(
      (message) =>
        leftMessage(message, loggedInUser, userInListId) ||
        rightMessage(message, loggedInUser, userInListId)
    )
    .filter((userMessage) => userMessage.content.includes(searchMessage));
}

export function newMessageObjectFunc(
  loggedInUser: {
    username: string;
    id: string;
  } | null,
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
