import { Route, Routes } from "react-router-dom";
import CheckboxList from "./pages/CheckboxList";
import SettingsGroup from "./pages/SettingsGroup";
import GroupMessages from "./pages/GroupMessages";
import Empty from "./pages/Empty";

export default function AllRoutes() {
  return (
    <Routes>      
      <Route path="/" element={<Empty />} />      
      <Route path="/groups/:groupId" element={<GroupMessages />} />
      <Route path="/groups/createGroups" element={<CheckboxList />} />
      <Route path="/settingsGroup/:groupId" element={<SettingsGroup />} />
      <Route path="/messages/:groupId" element={<GroupMessages />} />
    </Routes>
  );
}
