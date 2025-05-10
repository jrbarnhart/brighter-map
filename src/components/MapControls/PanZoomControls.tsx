import { useMapControls } from "@/contexts/MapControls/useMapControls";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { PanDirections } from "@/contexts/MapControls/MapControlsContext";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Minus,
  Plus,
} from "lucide-react";
import { SetStateAction } from "react";

function DirectionButton({
  direction,
  setPanDirection,
  className,
}: {
  direction: PanDirections;
  setPanDirection: React.Dispatch<SetStateAction<PanDirections | null>>;
  className?: string;
}) {
  const handlePan = (direction: PanDirections) => {
    setPanDirection(direction);
  };

  const stopPan = () => {
    setPanDirection(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      setPanDirection(direction);
    }
  };

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
      onKeyDown={handleKeyDown}
      onKeyUp={stopPan}
      onBlur={stopPan}
      aria-label={`Pan ${direction}`}
      title={`Pan ${direction}`}
      className={cn(
        className,
        "select-none touch-none pointer-events-auto h-10 md:h-14 w-10 md:w-14 border border-stone-400 bg-gray-700 hover:bg-gray-500"
      )}
    >
      {icon}
    </Button>
  );
}

export default function PanZoomControls({
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "children">) {
  const { className, ...rest } = props;
  const { setPanDirection } = useMapControls(); // Assuming your context has a setter

  return (
    <div className=" flex justify-between">
      <div
        className={cn(
          className,
          "grid grid-cols-[repeat(3,min-content)] grid-rows-3 pointer-events-none"
        )}
        {...rest}
      >
        <DirectionButton
          direction="up"
          setPanDirection={setPanDirection}
          className="col-start-2"
        />
        <DirectionButton
          direction="left"
          setPanDirection={setPanDirection}
          className="row-start-2"
        />
        <DirectionButton
          direction="right"
          setPanDirection={setPanDirection}
          className="row-start-2 col-start-3"
        />
        <DirectionButton
          direction="down"
          setPanDirection={setPanDirection}
          className="row-start-3 col-start-2"
        />
      </div>
      <div
        className={cn(
          className,
          "grid grid-cols-[repeat(3,min-content)] grid-rows-3 pointer-events-none"
        )}
        {...rest}
      >
        <Button
          aria-label="Zoom In"
          title="Zoom In"
          className="col-start-2 select-none touch-none pointer-events-auto h-10 md:h-14 w-10 md:w-14 border border-stone-400 bg-gray-700 hover:bg-gray-500"
        >
          <Plus />
        </Button>
        <Button
          aria-label="Zoom Out"
          title="Zoom Out"
          className="row-start-3 col-start-2 select-none touch-none pointer-events-auto h-10 md:h-14 w-10 md:w-14 border border-stone-400 bg-gray-700 hover:bg-gray-500"
        >
          <Minus />
        </Button>
      </div>
    </div>
  );
}
