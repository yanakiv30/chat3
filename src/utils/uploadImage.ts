import supabase from "../services/supabase";

const uploadImage = async (file: File): Promise<string | null> => {
  const { data, error } = await supabase.storage
    .from("images") 
    .upload(`public/${file.name}`, file);

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  return data?.path ?? null;
};

export default uploadImage;
