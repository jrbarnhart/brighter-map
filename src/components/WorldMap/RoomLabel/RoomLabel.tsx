import { useMemo } from "react";
import { calculateCentroid } from "../geometryHelpers";
import InfoLines from "./InfoLines";
import RoomTitle from "./RoomTitle";
import type { CombinedRoomData } from "@/lib/hooks/useCombinedData";
import { FiltersState } from "@/components/FiltersPanel/FiltersPanel";

type RoomLabelProps = {
  roomData: CombinedRoomData;
  filtersState: FiltersState;
};

export default function RoomLabel({ roomData, filtersState }: RoomLabelProps) {
  const { name, id, originOffset, points, labelOffset } = roomData;
  const { showLabels, showNames } = filtersState;

  // Calculate lable position
  const adjustedPoints: Array<[number, number]> = useMemo(() => {
    return points.map(([x, y]) => [
      x + originOffset[0],
      (y + originOffset[1]) * -1, // Y axis increases in downward direction
    ]);
  }, [points, originOffset]);

  const defaultLabelPosition = useMemo(
    () => calculateCentroid(adjustedPoints),
    [adjustedPoints]
  );

  const labelPosition: [number, number] = useMemo(
    () =>
      labelOffset
        ? [
            originOffset[0] + labelOffset[0],
            (originOffset[1] + labelOffset[1]) * -1, // Y axis increases in downward direction
          ]
        : defaultLabelPosition,
    [labelOffset, originOffset, defaultLabelPosition]
  );

  const labelX = labelPosition[0];
  const labelY = labelPosition[1];
  const labelZ = 0.2;

  return (
    <>
      <group
        key={`${name}-${id.toString()}-label-group`}
        position={[labelX, labelY, labelZ]}
        visible={showLabels}
      >
        <RoomTitle name={name} showNames={showNames} />
        <InfoLines roomData={roomData} filtersState={filtersState} />
      </group>
    </>
  );
}
