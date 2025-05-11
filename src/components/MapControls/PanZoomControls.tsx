import { useMapControls } from "@/contexts/MapControls/useMapControls";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  PanDirections,
  ZoomValues,
} from "@/contexts/MapControls/MapControlsContext";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Minus,
  Plus,
} from "lucide-react";
import { SetStateAction } from "react";

function ZoomButton({
  zoom,
  setZoom,
  className,
}: {
  zoom: ZoomValues;
  setZoom: React.Dispatch<SetStateAction<ZoomValues | null>>;
  className?: string;
}) {
  const handleZoom = () => {
    setZoom(zoom);
  };

  const stopZoom = () => {
    setZoom(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      setZoom(zoom);
    }
  };

  const preventContextMenu = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <Button
      aria-label={`Zoom ${zoom === "in" ? "In" : "Out"}`}
      title={`Zoom ${zoom === "in" ? "In" : "Out"}`}
      className={cn(
        className,
        "select-none touch-none pointer-events-auto h-10 md:h-14 w-10 md:w-14 border border-stone-400 bg-gray-700 hover:bg-gray-500"
      )}
      onContextMenu={preventContextMenu}
      onPointerDown={(e) => {
        e.preventDefault();
        handleZoom();
      }}
      onPointerLeave={stopZoom}
      onPointerUp={stopZoom}
      onKeyDown={handleKeyDown}
      onKeyUp={stopZoom}
      onBlur={stopZoom}
    >
      {zoom === "in" ? <Plus /> : <Minus />}
    </Button>
  );
}

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

type PanZoomControlsProps = Omit<
  React.HtmlHTMLAttributes<HTMLDivElement>,
  "children"
> & { infoOpen: boolean; filtersOpen: boolean };

export default function PanZoomControls({
  className,
  infoOpen,
  filtersOpen,
  ...rest
}: PanZoomControlsProps) {
  const { setPanDirection, setZoom } = useMapControls(); // Assuming your context has a setter

  return (
    <div className=" flex justify-between">
      <div
        className={cn(
          className,
          "grid grid-cols-[repeat(3,min-content)] grid-rows-3 pointer-events-none transition-transform duration-300 ease-in-out",
          filtersOpen && "md:translate-x-60"
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
          "grid grid-cols-[repeat(3,min-content)] grid-rows-3 pointer-events-none transition-transform duration-300 ease-in-out",
          infoOpen &&
            "md:-translate-x-[20rem] lg:-translate-x-[32rem] xl:-translate-x-[40rem]"
        )}
        {...rest}
      >
        <ZoomButton zoom="in" setZoom={setZoom} className="col-start-2" />
        <ZoomButton
          zoom="out"
          setZoom={setZoom}
          className="row-start-3 col-start-2"
        />
      </div>
    </div>
  );
}
