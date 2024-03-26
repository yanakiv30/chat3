import { useContext } from "react";
import { NavLink } from "react-router-dom";

export default function UserOptions({ ChatContext }) {
  const { setLoggedInUser } = useContext(ChatContext);
  return (
    <div>
      <br></br>
      <div>
        <NavLink
          to={"/groups/setGroups"}
          style={{ border: "2px solid #ccc", borderRadius: "7px" }}
        >
          Set new group
        </NavLink>
      </div>

      <br></br>
      <div>
        <button
          onClick={null}
          style={{ border: "1px solid #ccc", borderRadius: "7px" }}
        >
          Profile Settings
        </button>
      </div>
      <br></br>

      <div>
        <button
          onClick={() => setLoggedInUser(null)}
          style={{ border: "1px solid #ccc", borderRadius: "7px" }}
        >
          Logout
        </button>
      </div>
      <br></br>
    </div>
  );
}
