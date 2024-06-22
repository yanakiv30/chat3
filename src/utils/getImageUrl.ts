import supabase from "../services/supabase";

const getImageUrl = (path: string): string | null => {
  const { data} = supabase.storage
    .from('images')  // Replace 'images' with your actual bucket name if different
    .getPublicUrl(path); 

  return data?.publicUrl ?? null;  // Correct property access
};

export default getImageUrl;

