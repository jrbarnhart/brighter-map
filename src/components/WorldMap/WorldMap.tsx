import { Canvas, useThree } from "@react-three/fiber";
import { MapControls } from "@react-three/drei";
import RoomShape from "./RoomShape/RoomShape";
import RoomLabel from "./RoomLabel/RoomLabel";
import type { BaseMapData } from "@/queries/baseMapData/baseMapData";
import useCombinedData from "@/lib/hooks/useCombinedData";
import { FiltersState } from "../FiltersPanel/FiltersPanel";
import { useNavigate } from "react-router";
import { SetStateAction, useState } from "react";

type WorldMapProps = {
  baseMapData: BaseMapData;
  filtersState: FiltersState;
  setInfoOpen: React.Dispatch<SetStateAction<boolean>>;
};

function Controls() {
  const { invalidate } = useThree();

  return (
    <MapControls
      screenSpacePanning={true}
      panSpeed={1.5}
      zoomSpeed={1.5}
      enableRotate={false}
      onChange={() => {
        invalidate();
      }}
    />
  );
}

export default function WorldMap({
  baseMapData,
  filtersState,
  setInfoOpen,
}: WorldMapProps) {
  const combinedRoomData = useCombinedData({ baseMapData });
  const navigate = useNavigate();

  const [blockEvents, setBlockEvents] = useState(false);

  const handleRoomClick = (roomId: string) => {
    setBlockEvents(true);
    setInfoOpen(true);
    void navigate(`/rooms/${roomId}`);

    setTimeout(() => {
      setBlockEvents(false);
    }, 300);
  };

  return (
    <div id="canvas-container" className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 50 }}
        className="bg-stone-800"
        frameloop="demand"
      >
        <ambientLight />
        <Controls />
        {combinedRoomData.map((roomData) => (
          <group
            key={`${roomData.name}-${roomData.id.toString()}`}
            onClick={() => {
              handleRoomClick(roomData.id.toString());
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
