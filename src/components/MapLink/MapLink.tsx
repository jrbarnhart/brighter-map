import { useMapControls } from "@/contexts/MapControls/useMapControls";
import { cn } from "@/lib/utils";
import { InfoPanelContext } from "../InfoPanel/InfoPanel";
import { useOutletContext } from "react-router";
import { Button } from "../ui/button";
import { Map } from "lucide-react";

type MapLinkProps = {
  roomId: number;
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
};

const MapLink = ({
  roomId,
  children,
  className = "",
  showIcon = true,
}: MapLinkProps) => {
  const { setTargetPosition } = useMapControls();
  const context: InfoPanelContext = useOutletContext();
  const combinedRoomMap = context.combinedRoomMap;
  const room = combinedRoomMap.get(roomId);
  const roomName = room?.name || `Room ${roomId.toString()}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (room) {
      const [x, y] = room.center;
      setTargetPosition({ x, y });
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(
        "cursor-pointer bg-sky-800 hover:bg-sky-700 border border-stone-400 h-9 w-9",
        className
      )}
      aria-label={`Navigate to ${roomName}`}
      title={`Navigate to ${roomName}`}
    >
      {showIcon && <Map aria-hidden="true" />}
      {children}
    </Button>
  );
};

export default MapLink;
