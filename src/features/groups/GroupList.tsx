import { NavLink } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import Avatar from "../users/Avatar";
import { useAppSelector } from "../../store";
import { Flash, setArrFlashIdBool } from "./groupSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function GroupList() {
  const dispatch=useDispatch();
  const { loggedInUser, searchQuery } = useAppSelector((store) => store.user);
  const { localTeams, teamWithNewMessage ,arrFlashIdBool} = useAppSelector(
    (store) => store.group
  );

  const searchedTeams =
    searchQuery.length > 0
      ? localTeams.filter(
          (team) => team && team.name && team.name.includes(searchQuery)
        )
      : localTeams.filter((team) => team.name !== "");

  //const arrayWithFlashTeamId: { [key: string]: boolean }[] = [];

  //const arr1 =[] as Flash[];
  const [arr1, setArr1] = useState([] as Flash[]);
//   const addFlash = (flash: Flash) => {
//   setArr1(prevArr1 => [...prevArr1, flash]);
// };

const addKeyValue = (obj: {[key: number]: boolean}, key:number, value:boolean) => {
  obj[key] = value;
};
//const obj1 = {} as {[key: string]: boolean};
const [obj1, setObj1] = useState({} as {[key: string]: boolean})
const updateObj1 = (key: number, value: boolean) => {
    setObj1(prevObj1 => ({
      ...prevObj1,
      [key]: value
    }));
  };

  searchedTeams.map((team) => {
    const id = team.id;
    const isNewMessage = team.id === teamWithNewMessage.team_id;
    const obj={} as { [key: string]: boolean } ;
    obj[id] = isNewMessage;
   //isNewMessage&& arr1.push(obj);
   const isTeamId = !Object.keys(obj1).find(key=> +key===team.id);
   console.log(' isTeamId ', isTeamId );
   console.log('Object.keys(obj1)',Object.keys(obj1));
   
   isTeamId&&isNewMessage&& updateObj1(team.id,true);
   console.log("obj1", obj1);
    // !Object.keys(arrFlashIdBool).find(key=> +key===team.id)&&
    // isNewMessage&&dispatch(setArrFlashIdBool(arr1))
    return null;
  });
 
  //console.log("arrayWithFlashTeamId", arrayWithFlashTeamId);
  // console.log("arr1", arr1);
  // console.log("arrFlasId", arrFlashIdBool);

  return (
    <div>
      <ul>
        {searchedTeams.map((team) => (
          <li key={team.id}>
            <div style={{ display: "flex", gap: "5px" }}>
              <Avatar name={team.name} />
              <NavLink to={`/groups/${team.id}`}>{`${team.name} `}</NavLink>
              {team.members.at(-1)!.id === loggedInUser!.id ? (
                <NavLink to={`/settingsGroup/${team.id}`}>
                  <span style={{ fontSize: "8px" }}>
                    <FaCog />
                  </span>{" "}
                </NavLink>
              ) : (
                ""
              )}

              {team.id === teamWithNewMessage.team_id &&
              teamWithNewMessage.sender_id !== loggedInUser?.id ? (
                <span style={{ color: "green", fontSize: "13px" }}>
                  "You have a new message"{" "}
                </span>
              ) : (
                ""
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
