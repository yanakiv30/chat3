
import { useDispatch } from "react-redux";
import { setLoggedInUser,setIsRegister} from "../features/users/userSlice";
import { useAppSelector } from "../store";
import Login from "./Login";
import SignUp from "./SignUp";
import supabase from "../services/supabase";

export default function LoginOrSignUp() {
  const { users } = useAppSelector((store) => store.user);
  const dispatch = useDispatch();  
  const { isRegister } = useAppSelector((store) => store.user);
  
  function handleLogin(username: string, password: string) {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      dispatch(setLoggedInUser(user)); //user is a object
    } else {
      alert("Invalid credentials");
    }
  }

  async function handleSignUp(newUsername: string, newPassword: string,
    full_name:string,email:string,avatar:string,status:string) {
    // if (users.some((user) => user.username === newUsername)) {
    //   alert("This username already exists!");
    //   return;
    // }
    const newUser = {      
      email:email,
      username:newUsername,
      full_name:full_name,
      password:newPassword,
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
      console.log(data)
       //dispatch(addUser(data));
      
     //dispatch(setLoggedInUser(data));
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
