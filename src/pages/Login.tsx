import { useDispatch } from "react-redux";
import { setIsRegister } from "../../store/userSlice";

function Login({
  handleLogin,
}: {
  handleLogin: (email: string, password: string) => void;
}) {
  const dispatch = useDispatch();

  return (
    <div className="login">
      <h2>Welcome to chatSPA</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const email = formData.get("email");
          const password = formData.get("password");
          if (typeof email === "string" && typeof password === "string")
            handleLogin(email, password);
        }}
      >
        <label>
          Email:
          <input type="text" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>

        <button type="submit">Login</button>
      </form>
      <br></br>
      <br></br>
      <br></br>
      <p>
        If you don't have an account , please :
        <button onClick={() => dispatch(setIsRegister(true))}>Register</button>
      </p>
    </div>
  );
}
export default Login;
