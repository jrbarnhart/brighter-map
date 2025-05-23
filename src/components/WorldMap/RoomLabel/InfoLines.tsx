// The title has a bg and the info lines have a different bg
// The info lines need to have variations based on the type of info

import { Text } from "@react-three/drei";
import { useMemo } from "react";
import type { CombinedRoomItem } from "@/lib/hooks/useCombinedMap";
import { FiltersState } from "@/components/FiltersPanel/FiltersPanel";
import { INFO_ICONS } from "@/lib/constants/INFO_ICONS";

const INFO_COLORS = {
  // Should match variables in styles.css for consistency
  vendor: "#18edca",
  monster: "#ff7777", // Red for monsters
  resource: "#86fc86", // Green for resources
  portal: "#77bbff", // Blue for portals
  storage: "#c386fc", // Purple for storage/rifts
  obelisk: "#ffc94d", // Orange for obelisks
};

type InfoLinesProps = {
  roomData: CombinedRoomItem;
  filtersState: FiltersState;
};

export default function InfoLines({ roomData, filtersState }: InfoLinesProps) {
  const {
    showVendors,
    showMonsters,
    showResources,
    showPortal,
    showStorage,
    showObelisk,
  } = filtersState;

  // Config Constants
  const OFFSET_Y = -0.9;
  const BG_Z = -0.01;
  const TEXT_Z = 0.01;
  const FONT_HEIGHT = 0.5;
  const AVERAGE_FONT_WIDTH = 0.625;
  const LINE_SPACING = 0.4;
  const PADDING_Y = 0.3;
  const PADDING_X = 0.3;
  const LINE_OFFSET_MOD = -0.01;

  // Room data properties
  const { monsters, resources, portal, obelisk, rift, name, npcs } = roomData;

  // Construct label info lines
  const infoLines = useMemo(() => {
    const lines: Array<{
      icon: string;
      text: string;
      type: keyof typeof INFO_COLORS;
    }> = [];

    if (npcs.length && showVendors) {
      for (const npc of npcs) {
        if (npc.vendor?.name) {
          lines.push({
            icon: INFO_ICONS.vendor,
            text: npc.vendor.name,
            type: "vendor",
          });
        }
      }
    }
    if (monsters.length && showMonsters)
      monsters.forEach((m) =>
        lines.push({ icon: INFO_ICONS.monster, text: m.name, type: "monster" })
      );
    if (resources.length && showResources)
      resources.forEach((r) =>
        lines.push({
          icon: INFO_ICONS.resource,
          text: r.name,
          type: "resource",
        })
      );
    if (portal && showPortal)
      lines.push({ icon: INFO_ICONS.portal, text: "Portal", type: "portal" });
    if (rift && showStorage)
      lines.push({
        icon: INFO_ICONS.storage,
        text: "Storage",
        type: "storage",
      });
    if (obelisk && showObelisk)
      lines.push({
        icon: INFO_ICONS.obelisk,
        text: "Obelisk",
        type: "obelisk",
      });

    return lines;
  }, [
    monsters,
    npcs,
    obelisk,
    portal,
    resources,
    rift,
    showMonsters,
    showObelisk,
    showPortal,
    showResources,
    showStorage,
    showVendors,
  ]);

  // Estimate background size
  const bgDimensions = useMemo(() => {
    if (infoLines.length === 0) return { width: 0, height: 0 };

    const longestInfoLineLength = infoLines.reduce((a, b) =>
      a.text.length > b.text.length ? a : b
    ).text.length;

    const longestLineLength =
      longestInfoLineLength > name.length ? longestInfoLineLength : name.length;

    const textHeight =
      infoLines.length * FONT_HEIGHT +
      (infoLines.length > 0 ? infoLines.length * LINE_SPACING : 0);
    const paddingVertical = PADDING_Y * 2; // Top and bottom padding
    const height = textHeight + paddingVertical;

    const paddingHorizontal = PADDING_X * 2; // Left and right padding (adjust as needed)
    const width =
      longestLineLength * FONT_HEIGHT * AVERAGE_FONT_WIDTH + paddingHorizontal;

    return {
      width: width,
      height: height,
    };
  }, [infoLines, name.length]);

  // Don't return anything if there aren't any info lines
  if (infoLines.length === 0) return null;

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
      {infoLines.map((line, index) => (
        <Text
          key={`${line.type}-${index.toString()}`}
          position={[
            -bgDimensions.width / 2 + PADDING_X,
            OFFSET_Y - index * (FONT_HEIGHT + LINE_SPACING),
            TEXT_Z,
          ]}
          fontSize={FONT_HEIGHT}
          fontWeight={"bold"}
          color={INFO_COLORS[line.type]}
          anchorX="left"
          anchorY="top"
        >
          {`${line.icon}${line.text}`}
        </Text>
      ))}
    </>
  );
}
