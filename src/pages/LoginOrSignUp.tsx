


import { useDispatch } from "react-redux";
import { setLoggedInUser,setIsRegister} from "../features/users/userSlice";
import { useAppSelector } from "../store";
import Login from "./Login";
import SignUp from "./SignUp";
import supabase from "../services/supabase";
import { signInUser, signUpUser } from "../services/auth";

export default function LoginOrSignUp() {
 // const { users } = useAppSelector((store) => store.user);
  const dispatch = useDispatch();  
  const { isRegister } = useAppSelector((store) => store.user);
  
  async function handleLogin(email: string, password: string) {
    const authResponse=await signInUser(email,password);
    if(authResponse.error){
      console.error(authResponse.error);
      throw new Error("Failed to sign in user");
    }
    const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', authResponse.user_id);  
    
    // const user = users.find(
    //   (u) => u.username === username && u.password === password
    // );
    if (data) {
      dispatch(setLoggedInUser(data[0])); //user is a object
    } else {
      console.error(error)
      alert("Invalid credentials");
    }
  }

  async function handleSignUp(newUsername: string, newPassword: string,
    full_name:string,email:string,avatar:string,status:string) {
    // if (users.some((user) => user.username === newUsername)) {
    //   alert("This username already exists!");
    //   return;
    // }

    const authResponse = await signUpUser(email, newPassword);
    if(authResponse.error){
      console.error(authResponse.error);
      throw new Error("Failed to sign up user");
    }

    const newUser = {      
      username:newUsername,
      full_name:full_name,
      avatar:avatar,
      status:status
    };
    try {     
      const { data, error } = await supabase
      .from("users")
      .insert([newUser])
      .select();
    
      if (error) {
        console.error(error);
        throw new Error("Users could not be loaded");
      }
      const usersAuthData = await supabase
        .from("users_auth")
        .insert([{user_id:data[0].id,auth_id:authResponse.data.user!.id}])
        .select();


    } catch (error) {
      console.error("Error creating user:", error);
    }
   dispatch(setIsRegister(false)); 
  }
  return (
    <div className="background-login">
      {!isRegister ? (
        <Login
          handleLogin={handleLogin}          
        />
      ) : (
        <SignUp handleSignUp={handleSignUp} />
      )}
    </div>
  );
}