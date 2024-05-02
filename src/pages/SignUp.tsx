export default function SignUp({
  handleSignUp,
}: {
  handleSignUp: (newUsername: string, newPassword: string) => void;
}) {
  return (
    <div className="login">
      <h2>Please Sign Up</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const newUsername = formData.get("newUsername");
          const newPassword = formData.get("newPassword");
          if (
            typeof newUsername === "string" &&
            typeof newPassword === "string"
          )
            handleSignUp(newUsername, newPassword);
        }}
      >
        <label>
          New Username:
          <input type="text" name="newUsername" required />
        </label>
        <label>
          New Password:
          <input type="password" name="newPassword" required />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      
    </div>
  );
}
