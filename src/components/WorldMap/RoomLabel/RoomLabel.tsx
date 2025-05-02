import { useMemo } from "react";
import InfoLines from "./InfoLines";
import RoomTitle from "./RoomTitle";
import type { CombinedRoomItem } from "@/lib/hooks/useCombinedData";
import { FiltersState } from "@/components/FiltersPanel/FiltersPanel";

type RoomLabelProps = {
  roomData: CombinedRoomItem;
  filtersState: FiltersState;
};

export default function RoomLabel({ roomData, filtersState }: RoomLabelProps) {
  const { name, id, originOffset, labelOffset } = roomData;
  const { showLabels } = filtersState;

  const defaultLabelPosition = roomData.center;
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
        <RoomTitle name={name} />
        <InfoLines roomData={roomData} filtersState={filtersState} />
      </group>
    </>
  );
}
