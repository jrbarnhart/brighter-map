import { MapControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function CanvasControls() {
  const { invalidate } = useThree();

  return (
    <MapControls
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
