export default function EditUserMessage({
  updatedMessage,
  setUpdatedMessage,
  handleEditMessage,
  mesContent
}: any) {
  return (
    <div className="message-send">
      <input
        type="text"
        value={updatedMessage|| mesContent}
        onChange={(e) => setUpdatedMessage(e.target.value||mesContent)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleEditMessage();
          }
        }}
       // placeholder={mesContent}
      />
      
      <button onClick={() => handleEditMessage("42886d5c-905f-4551-8565-c787ceca14b9")}>Update message</button>
    </div>
  );
}
