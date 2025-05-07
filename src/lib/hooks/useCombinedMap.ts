// This hook combines data from this project with data from the api for easier use and room name matching

import { useMemo } from "react";
import roomRenderData from "../mapData/roomRenderData";
import type { BaseMapData } from "@/queries/baseMapData/baseMapData";
import type { components } from "../types/apiTypes";
import { calculateCentroid } from "../geometryHelpers";

export type CombinedRoomItem = RoomRenderData[number] &
  components["schemas"]["RoomEntity"] & { center: [number, number] };

export type CombinedRoomMap = Map<number, CombinedRoomItem>;

type UseRoomDataMapProps = {
  baseMapData: BaseMapData;
};

export default function useCombinedRoomMap({ ...props }: UseRoomDataMapProps) {
  const { baseMapData } = props;
  // Create a lookup map of the base data rooms
  const baseDataMap = useMemo(() => {
    return new Map<string, components["schemas"]["RoomEntity"]>();
  }, []);
  for (const room of baseMapData.rooms) {
    baseDataMap.set(room.name, room);
  }

  // Combine base data from api and render data
  const combinedRoomMap: CombinedRoomMap = useMemo(() => {
    const combinedRoomMap = new Map<number, CombinedRoomItem>();

    for (const renderData of roomRenderData) {
      // Get the matching base data from the API based on room name
      const baseRoomData = baseDataMap.get(renderData.name);

      // If a match is found add entry to combinedRoomMap
      if (baseRoomData) {
        // Calculate the center
        const adjustedPoints: Array<[number, number]> = renderData.points.map(
          ([x, y]) => [
            x + renderData.originOffset[0],
            (y + renderData.originOffset[1]) * -1, // Y axis increases in downward direction
          ]
        );
        const center = calculateCentroid(adjustedPoints);

        const combinedRoomItem: CombinedRoomItem = {
          ...baseRoomData,
          ...renderData,
          center,
        };

        combinedRoomMap.set(combinedRoomItem.id, combinedRoomItem);
      }
    }

    return combinedRoomMap;
  }, [baseDataMap]);

  return combinedRoomMap;
}
