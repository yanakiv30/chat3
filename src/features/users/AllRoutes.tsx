import { Navigate, Route, Routes } from "react-router-dom";
import UserOptions from "../../pages/UserOptions";
import CheckboxList from "../../pages/CheckboxList";
import SettingsGroup from "../../pages/SettingsGroup";
import { useAppSelector } from "../../store";
import UserMessages from "../../pages/UserMessages";
import GroupMessages from "../../pages/GroupMessages";

export default function AllRoutes() {
    const { loggedInUser, users } = useAppSelector((store) => store.user);

    function initialView(
        users: Array<{ id: string }>,
        loggedInUser: { id: string }
      ) {
        const finded = users.find((user) => user.id !== loggedInUser.id);
        if (finded) return finded.id;
        else return loggedInUser.id;
      }

    return (
        <Routes>
        <Route
          index
          element={
            <Navigate
              replace
              to={`/messages/${initialView(users, loggedInUser! as { id: string })}`}
            />
          }
        />
        <Route path="/userOptions" element={<UserOptions />} />
        <Route path="/messages/:userId" element={<UserMessages />} />
        <Route path="/groups/:groupId" element={<GroupMessages />} />
        <Route path="/groups/createGroups" element={<CheckboxList />} />
        <Route
          path="/settingsGroup/:groupId"
          element={<SettingsGroup />}
        />
      </Routes>
    )
}
