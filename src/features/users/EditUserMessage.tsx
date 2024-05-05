import { useDispatch } from "react-redux";
import { setIsEdit, setIsLoading } from "./userSlice";
import { useAppSelector } from "../../store";
import supabase from "../../services/supabase";

export default function EditUserMessage({
  updatedMessage,
  setUpdatedMessage,
  mesContent
}: any) {

  const dispatch = useDispatch();
  const { messageId,messages } = useAppSelector((store) => store.user);
  
  async function handleEditMessage(idForEdit: string) {
    dispatch(setIsEdit(true));
    const mesContent= messages.filter(message=> message.id===idForEdit)[0].content;
    console.log(mesContent);
    //setMesContent(mesContent);
   //const updatedMessages = messages.filter((x) => x.id !== idForEdit);
   //dispatch(setMessages(updatedMessages));
   //console.log("updatedMessage: ",updatedMessage);
   console.log(idForEdit);
   dispatch(setIsLoading(true));
   try {
     const { error } = await supabase
       .from("messages")
       .update({content: "default" })
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


  function edit(id:string){
    handleEditMessage(id);

    dispatch(setIsEdit(false))
  }
  return (
    <div className="message-send">
      <input
        type="text"
        value={updatedMessage|| mesContent}
        onChange={(e) => setUpdatedMessage(e.target.value||mesContent)}
       
       // placeholder={mesContent}
      />
      
      <button onClick={() =>edit(messageId) }>Update message</button>
    </div>
  );
}
