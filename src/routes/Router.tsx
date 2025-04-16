import { BrowserRouter, Route, Routes } from "react-router";
import RootRoute from "./root/root.route";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRoute />}>
          <Route path="/monsters" element={<div>Monster info</div>} />
          <Route path="/resources" element={<div>Resource</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
