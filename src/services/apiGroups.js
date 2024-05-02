import supabase from "./supabase";

export async function getGroups() {   
const { data, error } = await supabase.from('groups').select('*');
if(error) {
    console.error(error);
    throw new Error("Groups could not be loaded");
}
return data; 
};

export async function getGroupMessages() {    
const { data, error } = await supabase
.from('groupMessages')
.select('*')

    if(error) 
    {console.log(error);
      throw new Error("Group Messages could not be loaded");
    }
    return data;
  }

  