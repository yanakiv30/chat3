import { useDispatch, useSelector } from "react-redux";
import {setSearchMessage  } from './userSlice';

function SearchInMessage() {
  
  const dispatch = useDispatch();
  const { searchMessage } = useSelector(store=>store.user);

  return (
    <input
      style={{ width: "40%", borderRadius: "7px" }}
      value={searchMessage}
      onChange={(e) => dispatch(setSearchMessage(e.target.value))}
      placeholder="🔍 Search in messages ..."
    />
  );
}

export default SearchInMessage;
