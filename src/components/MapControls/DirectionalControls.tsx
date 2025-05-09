import { useThree } from "@react-three/fiber";
import { useMapControls } from "@/contexts/MapControls/useMapControls";

export default function DirectionalControls() {
  const { camera, invalidate } = useThree();
  const { targetPosition, setTargetPosition } = useMapControls(); // Assuming your context has a setter

  // Pan distance for each button press
  const panStep = 10;

  const handlePan = (direction: "up" | "down" | "left" | "right") => {
    // Get current position
    const currentX = targetPosition ? targetPosition.x : camera.position.x;
    const currentY = targetPosition ? targetPosition.y : camera.position.y;

    // Calculate new position based on direction
    let newX = currentX;
    let newY = currentY;

    switch (direction) {
      case "up":
        newY += panStep;
        break;
      case "down":
        newY -= panStep;
        break;
      case "left":
        newX -= panStep;
        break;
      case "right":
        newX += panStep;
        break;
    }

    // Update the target position
    setTargetPosition({ x: newX, y: newY });
    invalidate();
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          handlePan("up");
        }}
        aria-label="Pan Up"
      >
        ↑
      </button>
      <div>
        <button
          type="button"
          onClick={() => {
            handlePan("left");
          }}
          aria-label="Pan Left"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => {
            handlePan("right");
          }}
          aria-label="Pan Right"
        >
          →
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          handlePan("down");
        }}
        aria-label="Pan Down"
      >
        ↓
      </button>
    </div>
  );
}
