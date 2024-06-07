import { Navigate, Route, Routes } from "react-router-dom";
import UserOptions from "./pages/UserOptions";
import CheckboxList from "./pages/CheckboxList";
import SettingsGroup from "./pages/SettingsGroup";
import { useAppSelector } from "./store";
import GroupMessages from "./pages/GroupMessages";
import { User } from "./features/users/userSlice";
import Empty from "./pages/Empty";

export default function AllRoutes() {
  const { loggedInUser, users } = useAppSelector((store) => store.user);

  function initialView(users: User[], loggedInUser: User) {
    const finded = users.find((user) => user.id !== loggedInUser.id);
    if (finded) return finded.id;
    else return loggedInUser.id;
  }

  return (
    <Routes>
      {/* <Route
        index
        element={
          <Navigate
            replace
            to={`/messages/${initialView(users, loggedInUser!)}`}
          />
        }
      /> */}
      <Route path="/" element={<Empty />} />
      <Route path="/userOptions" element={<UserOptions />} />
      <Route path="/groups/:groupId" element={<GroupMessages />} />
      <Route path="/groups/createGroups" element={<CheckboxList />} />
      <Route path="/settingsGroup/:groupId" element={<SettingsGroup />} />
      <Route path="/messages/:groupId" element={<GroupMessages />} />
    </Routes>
  );
}
