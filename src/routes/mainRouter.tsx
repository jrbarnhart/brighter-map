import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import RootRoute from "./root/root.route";
import RoomDetails from "@/routes/RoomDetails/RoomDetails";
import MonsterDetails from "@/routes/MonsterDetails/MonsterDetails";
import InfoPanelIndex from "@/components/InfoPanel/InfoPanelIndex";
import VendorDetails from "@/routes/VendorDetails/VendorDetails";
import NpcDetails from "@/routes/NpcDetails/NpcDetails";
import ResourceDetails from "./ResourceDetails/ResourceDetails";
import QuestDetails from "./QuestDetails/QuestDetails";
import MiscItemDetails from "./MiscItemDetails/MiscItemDetails";
import ConsumableDetails from "./ConsumableDetails/ConsumableDetails";
import WeaponDetails from "./WeaponDetails/WeaponDetails";
import ArmorDetails from "./ArmorDetails/ArmorDetails";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootRoute />} errorElement={<ErrorScreen />}>
      <Route index element={<InfoPanelIndex />} />
      <Route path="/misc/:id" element={<MiscItemDetails />} />
      <Route path="/consumables/:id" element={<ConsumableDetails />} />
      <Route path="/resources/:id" element={<ResourceDetails />} />
      <Route path="/weapons/:id" element={<WeaponDetails />} />
      <Route path="/armors/:id" element={<ArmorDetails />} />
      <Route path="/rooms/:id" element={<RoomDetails />} />
      <Route path="/monsters/:id" element={<MonsterDetails />} />
      <Route path="/vendors/:id" element={<VendorDetails />} />
      <Route path="/npcs/:id" element={<NpcDetails />} />
      <Route path="/quests/:id" element={<QuestDetails />} />
    </Route>
  )
);
