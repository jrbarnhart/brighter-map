import { Canvas, ThreeEvent } from "@react-three/fiber";
import RoomShape from "./RoomShape/RoomShape";
import RoomLabel from "./RoomLabel/RoomLabel";
import { CombinedRoomData } from "@/lib/hooks/useCombinedData";
import { FiltersState } from "../FiltersPanel/FiltersPanel";
import { useNavigate } from "react-router";
import { SetStateAction, useRef, useState } from "react";
import CanvasControls from "./CanvasControls/CanvasControls";

type WorldMapProps = {
  combinedRoomData: CombinedRoomData;
  filtersState: FiltersState;
  setInfoOpen: React.Dispatch<SetStateAction<boolean>>;
};

export default function WorldMap({
  combinedRoomData,
  filtersState,
  setInfoOpen,
}: WorldMapProps) {
  const navigate = useNavigate();

  const [blockEvents, setBlockEvents] = useState(false);
  const clickStartRoomRef = useRef<string | null>(null);
  const clickStartPositionRef = useRef<{ x: number; y: number } | null>(null);

  const handleRoomClick = ({
    roomId,
    event,
  }: {
    roomId: string;
    event: ThreeEvent<MouseEvent>;
  }) => {
    if (clickStartPositionRef.current) {
      const dx = Math.abs(
        event.nativeEvent.clientX - clickStartPositionRef.current.x
      );
      const dy = Math.abs(
        event.nativeEvent.clientY - clickStartPositionRef.current.y
      );

      if (dx > 5 || dy > 5) {
        clickStartPositionRef.current = null;
        clickStartRoomRef.current = null;
        return;
      }
    }

    if (clickStartRoomRef.current !== roomId) {
      clickStartRoomRef.current = null;
      return;
    }

    clickStartPositionRef.current = null;
    clickStartRoomRef.current = null;

    setBlockEvents(true);
    setInfoOpen(true);
    void navigate(`/rooms/${roomId}`);

    setTimeout(() => {
      setBlockEvents(false);
    }, 300);
  };

  const handlePointerDown = ({
    roomId,
    event,
  }: {
    roomId: string;
    event: ThreeEvent<PointerEvent>;
  }) => {
    // Store room id
    clickStartRoomRef.current = roomId;
    // Store the screen coordinates
    clickStartPositionRef.current = {
      x: event.nativeEvent.clientX,
      y: event.nativeEvent.clientY,
    };
  };

  return (
    <div id="canvas-container" className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 50 }}
        className="bg-stone-800"
        frameloop="demand"
      >
        <ambientLight />
        <CanvasControls />
        {combinedRoomData.map((roomData) => (
          <group
            key={`${roomData.name}-${roomData.id.toString()}`}
            onPointerUp={(event) => {
              handleRoomClick({ event, roomId: roomData.id.toString() });
            }}
            onPointerDown={(event) => {
              handlePointerDown({ event, roomId: roomData.id.toString() });
            }}
          >
            <RoomShape roomData={roomData} />
            <RoomLabel roomData={roomData} filtersState={filtersState} />
          </group>
        ))}
      </Canvas>
      {blockEvents && (
        <div
          className="absolute inset-0 z-50"
          style={{ pointerEvents: "all" }}
        />
      )}
    </div>
  );
}
