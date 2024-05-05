import { useDispatch } from "react-redux";
import { setIsEdit } from "./userSlice";

export default function EditUserMessage({
  updatedMessage,
  setUpdatedMessage,
  handleEditMessage,
  mesContent
}: any) {
  const dispatch = useDispatch();
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
      
      <button onClick={() =>dispatch(setIsEdit(false)) }>Update message</button>
    </div>
  );
}
