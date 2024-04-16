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
  
  export function searchedMessageFunc (messages: {
    id: string;
    senderId: string;
    receiverId: string;
    senderUsername: string;
    content: string;
    hourMinDate: string;
    dayDate: string;
}[],loggedInUser: {
    username: string;
    id: string;
} | null,userInListId: string | undefined,searchMessage: string)
    {return messages.filter(
    (message) => leftMessage(message,loggedInUser,userInListId) 
    || rightMessage(message,loggedInUser,userInListId)
    ).filter((userMessage) =>
    userMessage.content.includes(searchMessage))}
  