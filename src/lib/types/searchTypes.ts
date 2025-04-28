import { components } from "./apiTypes";

export type SearchDataType =
  | "monster"
  | "room"
  | "vendor"
  | "npc"
  | "resource"
  | "miscItem"
  | "consumable"
  | "weapon"
  | "armor"
  | "quest";

export type ExtendedSearchData = { url: string; type: SearchDataType };

export type SearchableItem = (
  | components["schemas"]["RoomEntity"]
  | components["schemas"]["MiscItemEntity"]
  | components["schemas"]["ResourceEntity"]
  | components["schemas"]["ConsumableEntity"]
  | components["schemas"]["WeaponEntity"]
  | components["schemas"]["ArmorEntity"]
  | components["schemas"]["MonsterEntity"]
  | components["schemas"]["NpcEntity"]
  | components["schemas"]["VendorBaseEntity"]
  | components["schemas"]["QuestEntity"]
) &
  ExtendedSearchData;

export type SearchData = SearchableItem[];
