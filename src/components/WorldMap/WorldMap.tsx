import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React from "react";
import RoomShape from "./RoomShape/RoomShape";
import RoomLabel from "./RoomLabel/RoomLabel";
import type { BaseMapData } from "@/queries/baseMapData/baseMapData";
import useCombinedData from "@/lib/hooks/useCombinedData";
import { FiltersState } from "../FiltersPanel/FiltersPanel";

type WorldMapProps = {
  baseMapData: BaseMapData;
  filtersState: FiltersState;
};

function Controls() {
  const { invalidate } = useThree();
  return (
    <OrbitControls
      enableRotate={false}
      onChange={() => {
        invalidate();
      }}
    />
  );
}

export default function WorldMap({ baseMapData, filtersState }: WorldMapProps) {
  const combinedRoomData = useCombinedData({ baseMapData });

  return (
    <div id="canvas-container" className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 50 }}
        className="bg-stone-800"
        frameloop="demand"
      >
        <ambientLight intensity={100} />
        <Controls />
        {combinedRoomData.map((roomData) => (
          <React.Fragment key={`${roomData.name}-${roomData.id.toString()}`}>
            <RoomShape roomData={roomData} />
            <RoomLabel roomData={roomData} filtersState={filtersState} />
          </React.Fragment>
        ))}
      </Canvas>
    </div>
  );
}
