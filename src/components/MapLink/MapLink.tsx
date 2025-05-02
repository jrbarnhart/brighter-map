import { useMapControls } from "@/contexts/MapControls/useMapControls";
import { cn } from "@/lib/utils";

type MapLinkProps = {
  x: number;
  y: number;
  z?: number;
  children?: React.ReactNode;
  className?: string;
};

const MapLink: React.FC<MapLinkProps> = ({
  x,
  y,
  z,
  children,
  className = "",
}) => {
  const { setTargetPosition } = useMapControls();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setTargetPosition({ x, y, z });
  };

  return (
    <span onClick={handleClick} className={cn("cursor-pointer", className)}>
      🗺️{children}
    </span>
  );
};

export default MapLink;
