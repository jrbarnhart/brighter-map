import { createContext } from "react";

export type MapControlsContextType = {
  targetPosition: Position | null;
  setTargetPosition: (position: Position) => void;
};

export const MapControlsContext = createContext<MapControlsContextType | null>(
  null
);
