import { useDispatch } from "react-redux";
import { setSearchQuery } from "./userSlice";
import { useAppSelector } from "../../store";
function SearchUser() {
  const dispatch = useDispatch();
  const { searchQuery } = useAppSelector((store) => store.user);
  return (
    <input
      style={{ width: "60%", borderRadius: "7px" }}
      value={searchQuery}
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      placeholder=" 🔍 Search in users or groups"
    />
  );
}

export default SearchUser;
