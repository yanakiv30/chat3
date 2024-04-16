export function leftMessage(message: {
    id: string;
    senderId: string;
    receiverId: string;    
  },loggedInUser: {
    username: string;
    id: string;
} | null,userInListId: string | undefined) {
    return (
      message.receiverId === loggedInUser!.id &&
      message.senderId === userInListId
    );
  }

  export function rightMessage(message: {
    id: string;
    senderId: string;
    receiverId: string;    
  },loggedInUser: {
    username: string;
    id: string;
} | null,userInListId: string | undefined) {
    return (
      message.receiverId === userInListId &&
      message.senderId === loggedInUser!.id
    );
  }