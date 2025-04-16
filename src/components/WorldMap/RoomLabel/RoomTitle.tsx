import { Text } from '@react-three/drei'
import { useMemo } from 'react'

type RoomTitleProps = {
  name: string
}

export default function RoomTitle({ name }: RoomTitleProps) {
  // Config Constants
  const OFFSET_Y = 0.2
  const BG_Z = 0
  const TEXT_Z = 0.01
  const FONT_HEIGHT = 0.5
  const AVERAGE_FONT_WIDTH = 0.6
  const PADDING_Y = 0.2
  const PADDING_X = 0.2

  // Estimate background size
  const bgDimensions = useMemo(() => {
    if (name.length === 0) return { width: 0, height: 0 }

    const lineLength = name.length

    const paddingVertical = PADDING_Y * 2 // Top and bottom padding
    const height = FONT_HEIGHT + paddingVertical

    const paddingHorizontal = PADDING_X * 2 // Left and right padding (adjust as needed)
    const width =
      lineLength * FONT_HEIGHT * AVERAGE_FONT_WIDTH + paddingHorizontal

    return {
      width: width,
      height: height,
    }
  }, [name])

  return (
    <>
      {/* Title Background */}
      <mesh position={[0, -bgDimensions.height / 2 + OFFSET_Y, BG_Z]}>
        <planeGeometry args={[bgDimensions.width, bgDimensions.height]} />
        <meshBasicMaterial color="white" opacity={1} />
      </mesh>
      {/* Room name */}
      <Text
        position={[0, OFFSET_Y, TEXT_Z]}
        fontSize={FONT_HEIGHT}
        color="black"
        anchorX="center"
        anchorY="top"
        fontWeight="bold"
      >
        {name}
      </Text>
    </>
  )
}
