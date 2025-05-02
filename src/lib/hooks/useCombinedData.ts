// This hook combines data from this project with data from the api for easier use and room name matching

import { useMemo } from "react";
import roomRenderData from "../mapData/roomRenderData";
import type { BaseMapData } from "@/queries/baseMapData/baseMapData";
import type { components } from "../types/apiTypes";

export type CombinedRoomItem = RoomRenderData[number] &
  components["schemas"]["RoomEntity"];

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
  const combinedRoomData = useMemo(() => {
    return roomRenderData.map((renderData) => {
      const baseRoomData = baseDataMap.get(renderData.name);
      if (baseRoomData) {
        return {
          ...renderData,
          ...baseRoomData,
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
      return { ...renderData, ...emptyBaseData };
    });
  }, [baseDataMap]);

  return combinedRoomData;
}
