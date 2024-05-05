import { useDispatch } from "react-redux";
import { setIsEdit, setIsLoading, setMesContent } from "./userSlice";
import { useAppSelector } from "../../store";
import supabase from "../../services/supabase";
import { useState } from "react";

export default function EditUserMessage() {
  const dispatch = useDispatch();
  const { messageId, messages, mesContent } = useAppSelector((store) => store.user);
  const [updateContent, setUpdateContent] = useState("");
  
  async function handleEditMessage(idForEdit: string) {
    

    dispatch(setIsEdit(true));
    dispatch(setIsLoading(true));
    try {
      const { error } = await supabase
        .from("messages")
        .update({ content: updateContent })
        .eq("id", idForEdit)
        .select();
      if (error) {
        console.error(error);
        throw new Error("Message could not be edited");
      }
    } catch (error) {
      console.error("Error editing message:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  function edit(id: string) {
    handleEditMessage(id);
    console.log("mesContent : ",mesContent)
    dispatch(setIsEdit(false));
  }
  
  return (
    <div className="message-send">
      <input
        type="text"
        value={updateContent||mesContent}
        onChange={(e) => setUpdateContent(e.target.value || mesContent)}
        placeholder=""
      />

      <button onClick={() => edit(messageId)}>Update message</button>
    </div>
  );
}
