import { useMemo } from "react";
import { createLinePoints, createShapePath } from "../geometryHelpers";
import type { CombinedRoomItem } from "@/lib/hooks/useCombinedData";

type RoomShapeProps = {
  roomData: CombinedRoomItem;
};

export default function RoomShape({ ...props }: RoomShapeProps) {
  const { roomData } = props;
  const { name, originOffset, points, fillColor, borderColor, id } = roomData;

  const adjustedPoints: Array<[number, number]> = useMemo(() => {
    return points.map(([x, y]) => [
      x + originOffset[0],
      (y + originOffset[1]) * -1, // Y axis increases in downward direction
    ]);
  }, [points, originOffset]);

  return (
    <>
      {/* Draw the floor */}
      <mesh key={`${name}-${id.toString()}-floor`}>
        <shapeGeometry args={[createShapePath(adjustedPoints)]} />
        <meshBasicMaterial color={fillColor} />
      </mesh>
      {/* Draw the border */}
      <line key={`${name}-${id.toString()}-border`}>
        <bufferGeometry attach="geometry">
          <float32BufferAttribute
            attach="attributes-position"
            args={[createLinePoints(adjustedPoints), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={borderColor} linewidth={1} />
      </line>
    </>
  );
}
