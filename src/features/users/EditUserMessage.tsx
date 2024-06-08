import { useDispatch } from "react-redux";
import { setIsEdit, setIsLoading } from "./userSlice";
import { useAppSelector } from "../../store";
import supabase from "../../services/supabase";
import { useState } from "react";

export default function EditUserMessage() {
  const dispatch = useDispatch();
  const { messageId, mesContent } = useAppSelector(
    (store) => store.user
  );
 //console.log("mescontent", mesContent);
  const [updateContent, setUpdateContent] = useState("");

  async function handleEditMessage(idForEdit: number) {
   
    dispatch(setIsEdit(true));
    dispatch(setIsLoading(true));
    try {
      const { error } = await supabase
        .from("messages")
        .update({ message: updateContent })
        .eq("id", idForEdit)
        .select();
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      const errorMessage="Error editing message:"+ error;
      alert(errorMessage)
      console.error(errorMessage);
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  function edit(id: number) {
    
    handleEditMessage(id);
    dispatch(setIsEdit(false));
  }

  return (
    <div className="message-send">
      <input
        type="text"
        value={updateContent || mesContent||""}
        onChange={(e) => setUpdateContent(e.target.value || mesContent)}
        placeholder=""
      />

      <button onClick={() => edit(messageId)}>Update message</button>
    </div>
  );
}