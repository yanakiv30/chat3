function Login({ handleLogin,setIsPressedRegister }: { handleLogin: (username: string, password: string) => void; setIsPressedRegister: (value: boolean) => void }) {
   

    return (
        <div className="login">
          <h2>Welcome to chatSPA</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const username = formData.get("username");
              const password = formData.get("password");
              if (typeof username === "string" && typeof password === "string")
                handleLogin(username, password);
            }}
          >
            <label>
              Username:
              <input type="text" name="username" required />
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
            <button onClick={() => setIsPressedRegister(true)}>Register</button>
          </p>
        </div>
    )
}
export default Login;

