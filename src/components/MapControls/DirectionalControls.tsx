import { useMapControls } from "@/contexts/MapControls/useMapControls";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { PanDirections } from "@/contexts/MapControls/MapControlsContext";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

function DirectionButton({
  direction,
  handlePan,
  stopPan,
  className,
}: {
  direction: PanDirections;
  handlePan: (direction: PanDirections) => void;
  stopPan: () => void;
  className?: string;
}) {
  const preventContextMenu = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  let icon = <ArrowUp />;

  switch (direction) {
    case "up":
      icon = <ArrowUp />;
      break;
    case "down":
      icon = <ArrowDown />;
      break;
    case "left":
      icon = <ArrowLeft />;
      break;
    case "right":
      icon = <ArrowRight />;
      break;
  }
  return (
    <Button
      onContextMenu={preventContextMenu}
      onPointerDown={(e) => {
        e.preventDefault();
        handlePan(direction);
      }}
      onPointerLeave={stopPan}
      onPointerUp={stopPan}
      aria-label={`Pan ${direction}`}
      className={cn(
        className,
        "select-none touch-none pointer-events-auto h-10 md:h-14 w-10 md:w-14 border border-stone-400 bg-gray-700 hover:bg-gray-500"
      )}
    >
      {icon}
    </Button>
  );
}

export default function DirectionalControls({
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "children">) {
  const { className, ...rest } = props;
  const { setPanDirection } = useMapControls(); // Assuming your context has a setter

  const handlePan = (direction: "up" | "down" | "left" | "right") => {
    setPanDirection(direction);
  };

  const stopPan = () => {
    setPanDirection(null);
  };

  return (
    <div
      className={cn(
        className,
        "grid grid-cols-[repeat(3,min-content)] grid-rows-3 pointer-events-none"
      )}
      {...rest}
    >
      <DirectionButton
        direction="up"
        handlePan={handlePan}
        stopPan={stopPan}
        className="col-start-2"
      />
      <DirectionButton
        direction="left"
        handlePan={handlePan}
        stopPan={stopPan}
        className="row-start-2"
      />
      <DirectionButton
        direction="right"
        handlePan={handlePan}
        stopPan={stopPan}
        className="row-start-2 col-start-3"
      />
      <DirectionButton
        direction="down"
        handlePan={handlePan}
        stopPan={stopPan}
        className="row-start-3 col-start-2"
      />
    </div>
  );
}
