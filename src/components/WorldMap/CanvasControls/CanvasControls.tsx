import { useThree } from "@react-three/fiber";
import { MapControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useMapControls } from "@/contexts/MapControls/useMapControls";
import { Vector3, MathUtils } from "three"; // Import Vector3 and MathUtils

export default function CanvasControls() {
  const controlsRef = useRef<React.ComponentRef<typeof MapControls>>(null);
  const { camera, invalidate } = useThree();
  const { targetPosition, panDirection, zoom } = useMapControls();
  const ZOOM_MIN = 20;
  const ZOOM_MAX = 180;

  // Effect responds to zoom in map controls context
  useEffect(() => {
    let zoomInterval: NodeJS.Timeout | null = null;

    const handleZoom = () => {
      if (!zoom || !controlsRef.current) return;

      const zoomStep = 3;
      const newPosition = camera.position.clone();

      switch (zoom) {
        case "in":
          newPosition.z = Math.max(newPosition.z - zoomStep, ZOOM_MIN);
          break;
        case "out":
          newPosition.z = Math.min(newPosition.z + zoomStep, ZOOM_MAX);
          break;
      }

      camera.position.copy(newPosition);
      controlsRef.current.update();
      invalidate();
    };

    if (zoom) {
      handleZoom();
      zoomInterval = setInterval(handleZoom, 50);
    }

    return () => {
      if (zoomInterval) {
        clearInterval(zoomInterval);
      }
    };
  }, [zoom, camera.position, invalidate]);

  // Effect responds to targetPosition changes in map controls context
  useEffect(() => {
    let animationFrameId: number | null = null;
    const animationDuration = 500;
    let startTime: number | null = null;
    let startPosition: Vector3 | null = null;
    let targetVector: Vector3 | null = null;
    let startTarget: Vector3 | null = null;

    const animatePanToTarget = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      if (startPosition && targetVector && startTarget && controlsRef.current) {
        camera.position.lerpVectors(startPosition, targetVector, progress);
        controlsRef.current.target.lerpVectors(
          startTarget,
          new Vector3(targetVector.x, targetVector.y, 0),
          progress
        );
        controlsRef.current.update();
        invalidate();
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animatePanToTarget);
      } else {
        animationFrameId = null;
      }
    };

    if (targetPosition && controlsRef.current) {
      targetVector = new Vector3(
        targetPosition.x,
        targetPosition.y,
        camera.position.z
      );
      startPosition = camera.position.clone();
      startTarget = controlsRef.current.target.clone();
      startTime = null;

      animationFrameId = requestAnimationFrame(animatePanToTarget);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
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
      minDistance={ZOOM_MIN}
      maxDistance={ZOOM_MAX}
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
