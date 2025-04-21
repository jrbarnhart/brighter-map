import { BrowserRouter, Route, Routes } from "react-router";
import RootRoute from "./root/root.route";
import RoomDetails from "@/components/InfoPanel/RoomDetails/RoomDetails";
import MonsterDetails from "@/components/InfoPanel/MonsterDetails/MonsterDetails";
import InfoPanelIndex from "@/components/InfoPanel/InfoPanelIndex";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRoute />}>
          <Route index element={<InfoPanelIndex />} />
          <Route path="/monsters" element={<div>Monster info</div>} />
          <Route path="/resources" element={<div>Resource info</div>} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/monsters/:id" element={<MonsterDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
