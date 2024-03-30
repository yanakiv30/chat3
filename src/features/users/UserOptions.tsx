
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UserOptions() {
  const navigate = useNavigate();
  
  
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
          User Options
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
    </div>
  );
}
