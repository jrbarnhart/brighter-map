import { components } from "./apiTypes";

export type SearchDataType = "monster" | "room" | "vendor" | "npc" | "resource";

export type ExtendedSearchData = { url: string; type: SearchDataType };

export type SearchableItem = components["schemas"]["RoomEntity"] &
  ExtendedSearchData;

export type SearchData = SearchableItem[];
