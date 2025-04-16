// The title has a bg and the info lines have a different bg
// The info lines need to have variations based on the type of info

import { Text } from '@react-three/drei'
import { useMemo } from 'react'
import type { CombinedRoomData } from '@/lib/hooks/useCombinedData'

type InfoLinesProps = {
  roomData: CombinedRoomData
}

export default function InfoLines({ roomData }: InfoLinesProps) {
  // Config Constants
  const OFFSET_Y = -0.7
  const BG_Z = -0.01
  const TEXT_Z = 0.01
  const FONT_HEIGHT = 0.5
  const AVERAGE_FONT_WIDTH = 0.6
  const LINE_SPACING = 0.3
  const PADDING_Y = 0.2
  const PADDING_X = 0.2
  const LINE_OFFSET_MOD = 0.08

  // Room data properties
  const { monsters, resources, portal, obelisk, rift, name } = roomData

  // Construct label info lines
  const infoLines = useMemo(() => {
    const lines: Array<string> = []

    if (monsters.length) lines.push(...monsters.map((m) => `🧟${m.name}`))
    if (resources.length) lines.push(...resources.map((r) => `🪵${r.name}`))
    if (portal) lines.push('🌐Portal')
    if (obelisk) lines.push('🗿Obelisk')
    if (rift) lines.push('🌀Storage')
    return lines
  }, [roomData])

  // Estimate background size
  const bgDimensions = useMemo(() => {
    if (infoLines.length === 0) return { width: 0, height: 0 }

    const longestInfoLineLength = infoLines.reduce((a, b) =>
      a.length > b.length ? a : b,
    ).length

    const longestLineLength =
      longestInfoLineLength > name.length ? longestInfoLineLength : name.length

    const textHeight =
      infoLines.length * FONT_HEIGHT +
      (infoLines.length > 0 ? infoLines.length * LINE_SPACING : 0)
    const paddingVertical = PADDING_Y * 2 // Top and bottom padding
    const height = textHeight + paddingVertical

    const paddingHorizontal = PADDING_X * 2 // Left and right padding (adjust as needed)
    const width =
      longestLineLength * FONT_HEIGHT * AVERAGE_FONT_WIDTH + paddingHorizontal

    return {
      width: width,
      height: height,
    }
  }, [infoLines])

  // Don't return anything if there aren't any info lines
  if (infoLines.length === 0) return null

  // Return the info lines
  return (
    <>
      {/* Background */}
      <mesh
        position={[
          0,
          -bgDimensions.height / 2 +
            OFFSET_Y / 2 +
            infoLines.length * LINE_OFFSET_MOD,
          BG_Z,
        ]}
      >
        <planeGeometry args={[bgDimensions.width, bgDimensions.height]} />
        <meshBasicMaterial color="black" opacity={1} />
      </mesh>
      {/* Info lines */}
      <Text
        position={[-bgDimensions.width / 2 + PADDING_X, OFFSET_Y, TEXT_Z]}
        fontSize={FONT_HEIGHT}
        fontWeight={'bold'}
        color="white"
        anchorX="left"
        anchorY="top"
      >
        {infoLines.join('\n')}
      </Text>
    </>
  )
}
