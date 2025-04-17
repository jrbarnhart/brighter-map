import { BrowserRouter, Route, Routes } from "react-router";
import RootRoute from "./root/root.route";
import RoomDetails from "@/components/InfoPanel/RoomDetails/RoomDetails";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRoute />}>
          <Route path="/monsters" element={<div>Monster info</div>} />
          <Route path="/resources" element={<div>Resource info</div>} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
