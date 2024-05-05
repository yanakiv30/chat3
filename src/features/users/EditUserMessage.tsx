export default function EditUserMessage({
  updatedMessage,
  setUpdatedMessage,
  handleEditMessage,
}: any) {
  return (
    <div className="message-send">
      <input
        type="text"
        value={updatedMessage}
        onChange={(e) => setUpdatedMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleEditMessage();
          }
        }}
        placeholder="Edit..."
      />
      
      <button onClick={() => handleEditMessage}>Update message</button>
    </div>
  );
}
