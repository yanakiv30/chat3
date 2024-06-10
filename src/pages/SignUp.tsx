
import { faSortAmountAsc } from "@fortawesome/free-solid-svg-icons";

export default function SignUp({
  handleSignUp,
}: {
  handleSignUp: (newUsername: string, newPassword: string,full_name:string,
    email:string,avatar:string,status:string
  ) => void;
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
          const full_name = formData.get("full_name");
          const email = formData.get("email");
          const avatar = formData.get("avatar");
          const status = formData.get("status");

          if (
            typeof newUsername === "string" &&
            typeof newPassword === "string" &&
            typeof full_name === "string"&&
            typeof email === "string"&&
            typeof avatar === "string"&&
            typeof status === "string"
          )
            handleSignUp(newUsername, newPassword,full_name,email,avatar,status);
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
        <label>
        Full Name:
          <input type="text" name="full_name" required />
        </label>
        <label>
        Email:
          <input type="text" name="email" required />
        </label>
        <label>
        Avatar:
          <input type="text" name="avatar" required />
        </label>
        <label>
        Status:
          <input type="text" name="status" required />
        </label>

        <button type="submit">Sign Up</button>
      </form>
      
    </div>
  );
}
