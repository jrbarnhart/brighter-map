import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import React from 'react'
import RoomShape from './RoomShape/RoomShape'
import RoomLabel from './RoomLabel/RoomLabel'
import type { BaseMapData } from '@/queries/baseMapData/baseMapData'
import useCombinedData from '@/lib/hooks/useCombinedData'

type WorldMapProps = {
  baseMapData: BaseMapData
}

function Controls() {
  const { invalidate } = useThree()
  return <OrbitControls enableRotate={false} onChange={() => invalidate()} />
}

export default function WorldMap({ ...props }: WorldMapProps) {
  const { baseMapData } = props

  const combinedRoomData = useCombinedData({ baseMapData })

  return (
    <div id="canvas-container" className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 50 }}
        className="bg-stone-800"
        frameloop="demand"
      >
        <Controls />
        {combinedRoomData.map((roomData) => (
          <React.Fragment key={`${roomData.name}-${roomData.id}`}>
            <RoomShape roomData={roomData} />
            <RoomLabel roomData={roomData} />
          </React.Fragment>
        ))}
      </Canvas>
    </div>
  )
}
