import { useState } from "react";

export default function SendUserMessage({
  newMessage,
  setNewMessage,
  handleSendMessage,
}: any) {

  

  function handleUpload() {}
  function handleFileChange() {}

  return (
    <div>
      <div className="message-send">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>

      <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      </div>
    </div>
  );
}
