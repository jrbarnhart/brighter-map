import { useThree } from "@react-three/fiber";
import { MapControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useMapControls } from "@/contexts/MapControls/useMapControls";

export default function CanvasControls() {
  const controlsRef = useRef<React.ComponentRef<typeof MapControls>>(null);
  const { invalidate } = useThree();
  const { targetPosition } = useMapControls();

  useEffect(() => {
    if (targetPosition && controlsRef.current) {
      controlsRef.current.target.set(targetPosition.x, targetPosition.y, 0);

      if (targetPosition.z !== undefined) {
        const camera = controlsRef.current.object;

        camera.position.set(
          targetPosition.x,
          targetPosition.y,
          targetPosition.z
        );
      }

      controlsRef.current.update();
      invalidate();
    }
  }, [invalidate, targetPosition]);

  return (
    <MapControls
      ref={controlsRef}
      screenSpacePanning={true}
      panSpeed={1.5}
      zoomSpeed={1.5}
      minDistance={20}
      maxDistance={180}
      enableRotate={false}
      onChange={() => {
        invalidate();
      }}
    />
  );
}
