import { useDispatch } from "react-redux";
import { setLoggedInUser, setIsRegister } from "../../store/userSlice";
import { useAppSelector } from "../../store/store";
import Login from "./Login";
import SignUp from "./SignUp";
import supabase from "../services/supabase";
import { signInUser, signUpUser } from "../services/auth";

export default function LoginOrSignUp() {    
  const { isRegister } = useAppSelector((store) => store.user);  
  return (
    <div className="background-login">
      {!isRegister ? (
        <Login  />
      ) : (
        <SignUp  />
      )}
    </div>
  );
}
