import { BrowserRouter, Route, Routes } from "react-router";
import App from "./index/App";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/monsters" element={<div>Monster info</div>} />
          <Route path="/resources" element={<div>Resource</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
