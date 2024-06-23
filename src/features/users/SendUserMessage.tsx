import React, { useState, ChangeEvent, useRef } from "react";
import uploadImage from "../../utils/uploadImage";
import { setIsDeleteTeam } from "../groups/groupSlice";
import { useDispatch } from "react-redux";

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
  const [fileInputKey, setFileInputKey] = useState<string | number>(Date.now());
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Автоматично качване на файла и изпращане на съобщението
      const filePath = await uploadImage(selectedFile);
      if (filePath) {
        console.log("File uploaded successfully:", filePath);
        handleSendMessage(newMessage, filePath);
        setNewMessage(""); // Изчистване на съобщението след изпращане
        setFileInputKey(Date.now()); // Обновяване на ключа за input, за да се нулира
      }
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
              setNewMessage(""); // Изчистване на съобщението след изпращане
            }
          }}
          placeholder="Type your message..."
        />
        <div className="upload-and-send">
          <input
            key={fileInputKey}
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }} // Скриване на оригиналното поле за файл
            ref={fileInputRef}
          />
          <button onClick={handleUploadClick} style={{margin:"10px", fontSize:"18px"}}>+</button>
          <button onClick={() => {
            
            handleSendMessage(newMessage);
            setNewMessage(""); // Изчистване на съобщението след изпращане
          }} style={{ fontSize:"18px"}}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendUserMessage;
