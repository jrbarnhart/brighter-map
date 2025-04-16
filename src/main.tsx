import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import Router from "./routes/Router.tsx";

createRoot(document.getElementById("root") as Element).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
