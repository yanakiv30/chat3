import supabase from "../services/supabase";


const deleteImage = async (path: string) => {
  const { error } = await supabase.storage
    .from("images") // Replace 'images' with your actual bucket name if different
    .remove([path]);

  if (error) {
    console.error("Error deleting image:", error);
    return false;
  }

  return true;
};

export default deleteImage;
