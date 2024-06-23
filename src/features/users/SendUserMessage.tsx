import React, { useState, ChangeEvent } from "react";
import uploadImage from "../../utils/uploadImage";

interface SendUserMessageProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: (message: string, imagePath?: string) => void;
}

const SendUserMessage: React.FC<SendUserMessageProps> = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const filePath = await uploadImage(file);
      if (filePath) {
        console.log("File uploaded successfully:", filePath);
        handleSendMessage(newMessage, filePath);
      }
    } else {
      throw new Error("No file!");
    }
  };

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
              handleSendMessage(newMessage);
            }
          }}
          placeholder="Type your message..."
        />
        <button onClick={() => handleSendMessage(newMessage)}>
          Send Message
        </button>
      </div>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload File And Send Message</button>
      </div>
    </div>
  );
};

export default SendUserMessage;
