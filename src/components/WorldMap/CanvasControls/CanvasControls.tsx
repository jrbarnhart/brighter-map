import { useThree } from "@react-three/fiber";
import { MapControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useMapControls } from "@/contexts/MapControls/useMapControls";
import { Vector3, MathUtils } from "three"; // Import Vector3 and MathUtils

export default function CanvasControls() {
  const controlsRef = useRef<React.ComponentRef<typeof MapControls>>(null);
  const { camera, invalidate } = useThree();
  const { targetPosition, panDirection } = useMapControls();

  // Effect responds to targetPosition changes in map controls context
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

  // Effect responds to panDiretion changes in map controls context
  useEffect(() => {
    let panInterval = null;

    const handlePan = () => {
      if (!panDirection || !controlsRef.current) return;

      const panStep = 1.8;

      const newPosition = new Vector3(
        camera.position.x,
        camera.position.y,
        camera.position.z
      );

      switch (panDirection) {
        case "up":
          newPosition.y += panStep;
          break;
        case "down":
          newPosition.y -= panStep;
          break;
        case "left":
          newPosition.x -= panStep;
          break;
        case "right":
          newPosition.x += panStep;
      }

      camera.position.copy(newPosition);
      camera.rotation.set(MathUtils.degToRad(-90), 0, 0);
      controlsRef.current.target.set(newPosition.x, newPosition.y, 0);
      controlsRef.current.update();
      invalidate();
    };

    // Execute immediately once if panDirection exists
    if (panDirection) {
      handlePan();

      // Set up interval for continuous panning
      panInterval = setInterval(handlePan, 50);
    }

    // Clean up on unmount or when panDirection changes
    return () => {
      if (panInterval) {
        clearInterval(panInterval);
      }
    };
  }, [camera.position, camera.rotation, invalidate, panDirection]);

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
