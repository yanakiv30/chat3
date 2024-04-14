import { NavLink } from "react-router-dom";
import { setLoggedInUser } from "./userSlice";
import { useDispatch } from "react-redux";
export default function LogoLogout() {
    const dispatch = useDispatch();
    return (
        <div className="button-link">
        <p>🗣️ChatSpa</p>
        <NavLink
          to={"/groups/createGroups"}
          style={{ border: "2px solid #ccc", borderRadius: "7px" }}
        >
          Create new group
        </NavLink>
        <button
          onClick={() => dispatch(setLoggedInUser(null))}
          style={{ border: "1px solid #ccc", borderRadius: "7px" }}
        >
          Logout
        </button>
      </div>
    )
}
