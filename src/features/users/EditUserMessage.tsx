export default function EditUserMessage({
    newMessage,
    setNewMessage,
    handleEditMessage,
  }: any) {
    return (
      <div className="message-send">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleEditMessage();
            }
          }}
          placeholder="Edit..."
        />
  
        <button onClick={handleEditMessage}>Update message</button> 
      </div>
    );
  }
  