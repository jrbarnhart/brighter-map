import { components } from "./apiTypes";

export type SearchDataType = "monster" | "room" | "vendor" | "npc" | "resource";

export type ExtendedSearchData = { url: string };

export type SearchableItem = components["schemas"]["RoomEntity"] & {
  url: string;
};

export type SearchData = SearchableItem[];
