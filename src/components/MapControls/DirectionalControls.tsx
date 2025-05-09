import { useMapControls } from "@/contexts/MapControls/useMapControls";
import { Button } from "../ui/button";

export default function DirectionalControls() {
  const { setPanDirection } = useMapControls(); // Assuming your context has a setter

  const handlePan = (direction: "up" | "down" | "left" | "right") => {
    setPanDirection(direction);
  };

  const stopPan = () => {
    setPanDirection(null);
  };

  return (
    <div>
      <Button
        type="button"
        onMouseDown={() => {
          handlePan("up");
        }}
        onMouseLeave={stopPan}
        aria-label="Pan Up"
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
          aria-label="Pan Left"
        >
          ←
        </Button>
        <Button
          type="button"
          onMouseDown={() => {
            handlePan("right");
          }}
          onMouseLeave={stopPan}
          aria-label="Pan Right"
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
        aria-label="Pan Down"
      >
        ↓
      </Button>
    </div>
  );
}
