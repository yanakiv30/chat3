// import { useState } from "react";

// export default function SendUserMessage({
//   newMessage,
//   setNewMessage,
//   handleSendMessage,
// }: any) {

  

//   function handleUpload() {}
//   function handleFileChange() {}

//   return (
//     <div>
//       <div className="message-send">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               e.preventDefault();
//               handleSendMessage();
//             }
//           }}
//           placeholder="Type your message..."
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>

//       <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload File</button>
//       </div>
//     </div>
//   );
// }
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
        // You can use this filePath to attach the image to a message or perform other actions
        console.log("File uploaded successfully:", filePath);
        handleSendMessage(newMessage, filePath);
        setFile(null); // Clear the file input
      }
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
        <button onClick={() => handleSendMessage(newMessage)}>Send</button>
      </div>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload File</button>
      </div>
      
    </div>
  );
};

export default SendUserMessage;
