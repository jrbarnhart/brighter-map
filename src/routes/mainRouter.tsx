import { BrowserRouter, Route, Routes } from "react-router";
import RootRoute from "./root/root.route";
import RoomDetails from "@/routes/RoomDetails/RoomDetails";
import MonsterDetails from "@/routes/MonsterDetails/MonsterDetails";
import InfoPanelIndex from "@/components/InfoPanel/InfoPanelIndex";
import VendorDetails from "@/routes/VendorDetails/VendorDetails";
import NpcDetails from "@/routes/NpcDetails/NpcDetails";
import ResourceDetails from "./ResourceDetails/ResourceDetails";

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
          <Route path="/vendors/:id" element={<VendorDetails />} />
          <Route path="/npcs/:id" element={<NpcDetails />} />
          <Route path="/resources/:id" element={<ResourceDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
