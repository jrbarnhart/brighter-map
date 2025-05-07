import { useMapControls } from "@/contexts/MapControls/useMapControls";
import { cn } from "@/lib/utils";
import { InfoPanelContext } from "../InfoPanel/InfoPanel";
import { useOutletContext } from "react-router";

type MapLinkProps = {
  roomId: number;
  children?: React.ReactNode;
  className?: string;
};

const MapLink: React.FC<MapLinkProps> = ({
  roomId,
  children,
  className = "",
}) => {
  const { setTargetPosition } = useMapControls();
  const context: InfoPanelContext = useOutletContext();
  const combinedRoomMap = context.combinedRoomMap;
  const center = combinedRoomMap.get(roomId)?.center;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (center) {
      const [x, y] = center;
      setTargetPosition({ x, y });
    }
  };

  return (
    <span onClick={handleClick} className={cn("cursor-pointer", className)}>
      🗺️{children}
    </span>
  );
};

export default MapLink;
