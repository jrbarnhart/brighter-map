import { createContext, SetStateAction } from "react";

export type PanDirections = "up" | "down" | "left" | "right";
export type ZoomValues = "in" | "out";

export type MapControlsContextType = {
  targetPosition: Position | null;
  setTargetPosition: (position: Position) => void;
  panDirection: PanDirections | null;
  setPanDirection: React.Dispatch<SetStateAction<PanDirections | null>>;
  zoom: ZoomValues | null;
  setZoom: React.Dispatch<SetStateAction<ZoomValues | null>>;
};

export const MapControlsContext = createContext<MapControlsContextType | null>(
  null
);
