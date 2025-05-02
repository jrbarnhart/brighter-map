// This hook combines data from this project with data from the api for easier use and room name matching

import { useMemo } from "react";
import roomRenderData from "../mapData/roomRenderData";
import type { BaseMapData } from "@/queries/baseMapData/baseMapData";
import type { components } from "../types/apiTypes";
import { calculateCentroid } from "../geometryHelpers";

export type CombinedRoomItem = RoomRenderData[number] &
  components["schemas"]["RoomEntity"] & { center: [number, number] };

export type CombinedRoomData = Array<CombinedRoomItem>;

type UseCombinedDataProps = {
  baseMapData: BaseMapData;
};

export default function useCombinedData({ ...props }: UseCombinedDataProps) {
  const { baseMapData } = props;
  // Create a lookup map of the base data rooms
  const baseDataMap = useMemo(() => {
    return new Map<string, components["schemas"]["RoomEntity"]>();
  }, []);
  for (const room of baseMapData.rooms) {
    baseDataMap.set(room.name, room);
  }

  // Combine base data from api and render data
  const combinedRoomData: CombinedRoomData = useMemo(() => {
    return roomRenderData.map((renderData) => {
      const baseRoomData = baseDataMap.get(renderData.name);
      if (baseRoomData) {
        const adjustedPoints: Array<[number, number]> = renderData.points.map(
          ([x, y]) => [
            x + renderData.originOffset[0],
            (y + renderData.originOffset[1]) * -1, // Y axis increases in downward direction
          ]
        );

        const center = calculateCentroid(adjustedPoints);

        return {
          ...renderData,
          ...baseRoomData,
          center,
        };
      }
      console.error("Missing or mismatched room data.");
      const emptyBaseData: components["schemas"]["RoomEntity"] = {
        banks: [],
        craftingSkills: [],
        id: -100,
        resources: [],
        monsters: [],
        name: "ERROR",
        npcs: [],
        obelisk: false,
        portal: false,
        rift: false,
        questSteps: [],
        region: { id: -100, name: "ERROR" },
        regionId: -100,
      };
      return { ...renderData, ...emptyBaseData, center: [0, 0] };
    });
  }, [baseDataMap]);

  return combinedRoomData;
}
