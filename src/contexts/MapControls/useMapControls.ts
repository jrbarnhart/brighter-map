import { use } from "react";
import { MapControlsContext } from "./MapControlsContext";

export const useMapControls = () => {
  const context = use(MapControlsContext);
  if (!context) {
    throw new Error("useMapControls must be used within a MapControlsProvider");
  }
  return context;
};
