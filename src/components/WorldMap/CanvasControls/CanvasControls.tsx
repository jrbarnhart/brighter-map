import { useThree } from "@react-three/fiber";
import { MapControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useMapControls } from "@/contexts/MapControls/useMapControls";
import { Vector3, MathUtils } from "three"; // Import Vector3 and MathUtils

export default function CanvasControls() {
  const controlsRef = useRef<React.ComponentRef<typeof MapControls>>(null);
  const { camera, invalidate } = useThree();
  const { targetPosition } = useMapControls();

  useEffect(() => {
    if (targetPosition && controlsRef.current) {
      const newPosition = new Vector3(
        targetPosition.x,
        targetPosition.y,
        camera.position.z
      );

      // Directly set the camera's position
      camera.position.copy(newPosition);

      // Ensure the camera is looking straight down (no rotation)
      camera.rotation.set(MathUtils.degToRad(-90), 0, 0); // -90 degrees on the X-axis

      controlsRef.current.target.set(targetPosition.x, targetPosition.y, 0);
      controlsRef.current.update();
      invalidate();
    }
  }, [camera, invalidate, targetPosition]);

  return (
    <MapControls
      ref={controlsRef}
      screenSpacePanning={true}
      panSpeed={1.5}
      zoomSpeed={1.5}
      minDistance={20}
      maxDistance={180}
      enableRotate={false}
      enableZoom={true}
      onChange={() => {
        invalidate();
      }}
      onUpdate={() => {
        invalidate();
      }}
    />
  );
}
