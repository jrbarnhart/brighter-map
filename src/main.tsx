import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { router } from "./routes/mainRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MapControlsProvider } from "./contexts/MapControls/MapControlsProvider";
import { RouterProvider } from "react-router";

const queryClient = new QueryClient();

createRoot(document.getElementById("root") as Element).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MapControlsProvider>
        <RouterProvider router={router} />
      </MapControlsProvider>
    </QueryClientProvider>
  </StrictMode>
);
