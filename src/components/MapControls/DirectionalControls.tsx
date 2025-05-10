import { useMapControls } from "@/contexts/MapControls/useMapControls";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

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
    <div className={cn(className, "")} {...rest}>
      <Button
        type="button"
        onMouseDown={() => {
          handlePan("up");
        }}
        onMouseLeave={stopPan}
        onMouseUp={stopPan}
        aria-label="Pan Up"
        className="pointer-events-auto"
      >
        ↑
      </Button>
      <div>
        <Button
          type="button"
          onMouseDown={() => {
            handlePan("left");
          }}
          onMouseLeave={stopPan}
          onMouseUp={stopPan}
          aria-label="Pan Left"
          className="pointer-events-auto"
        >
          ←
        </Button>
        <Button
          type="button"
          onMouseDown={() => {
            handlePan("right");
          }}
          onMouseLeave={stopPan}
          onMouseUp={stopPan}
          aria-label="Pan Right"
          className="pointer-events-auto"
        >
          →
        </Button>
      </div>
      <Button
        type="button"
        onMouseDown={() => {
          handlePan("down");
        }}
        onMouseLeave={stopPan}
        onMouseUp={stopPan}
        aria-label="Pan Down"
        className="pointer-events-auto"
      >
        ↓
      </Button>
    </div>
  );
}
