
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {setLoggedInUser  } from './userSlice';
import { useDispatch } from "react-redux";

export default function UserOptions({ ChatContext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  return (
    <div
      style={{
        border: "2px solid #ccc",
        borderRadius: "7px",
        height: "fit-content",
        backgroundColor: " rgb(234, 229, 225)",
      }}
    >
      <div>
        <NavLink
          to={"/groups/createGroups"}
          style={{ border: "2px solid #ccc", borderRadius: "7px" }}
        >
          Create new group
        </NavLink>
        <button onClick={() => navigate("/")}>X</button>
      </div>

      <br></br>
      <div>
        <button
          onClick={() => alert("No functionality yet!")}
          style={{ border: "1px solid #ccc", borderRadius: "7px" }}
        >
          User Settings
        </button>
      </div>
      <br></br>

      <div>
        <button
          onClick={() => dispatch(setLoggedInUser(null))}
          style={{ border: "1px solid #ccc", borderRadius: "7px" }}
        >
          Logout
        </button>
      </div>
      <br></br>
    </div>
  );
}
