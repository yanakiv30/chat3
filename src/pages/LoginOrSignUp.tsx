import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { setLoggedInUser, addUser } from "../features/users/userSlice";
import { useAppSelector } from "../store";
import Login from "./Login";
import SignUp from "./SignUp";
import supabase from "../services/supabase";
const API_URL = "http://localhost:3001";

export default function LoginOrSignUp() {
  const { users } = useAppSelector((store) => store.user);
  const dispatch = useDispatch();
  const [isPressedRegister, setIsPressedRegister] = useState(false);

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

  async function handleSignUp(newUsername: string, newPassword: string) {
    if (users.some((user) => user.username === newUsername)) {
      alert("This username already exists!");
      return;
    }
    const newUser = {
      id: uuid(),
      username: newUsername,
      password: newPassword,
    };
    try {
      // const response = await fetch(`${API_URL}/users`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(newUser),
      // });
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // const data = await response.json();

      const { data, error } = await supabase
      .from("users")
      .insert([{ id: uuid(), username: newUsername, password: newPassword }])
      .select();
  
    if (error) {
      console.error(error);
      throw new Error("Users could not be loaded");
    }

      dispatch(addUser(data));
      
     dispatch(setLoggedInUser(data));
    } catch (error) {
      console.error("Error creating user:", error);
    }

   
  }
 

  return (
    <div className="background-login">
      {!isPressedRegister ? (
        <Login
          handleLogin={handleLogin}
          setIsPressedRegister={setIsPressedRegister}
        />
      ) : (
        <SignUp handleSignUp={handleSignUp} />
      )}
    </div>
  );
}
