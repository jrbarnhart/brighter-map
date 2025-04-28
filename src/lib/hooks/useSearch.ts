import { armorsQueryOptions } from "@/queries/armors/armorsQueryOptions";
import { consumablesQueryOptions } from "@/queries/consumables/consumablesQueryOptions";
import { miscItemsQueryOptions } from "@/queries/miscItems/miscItemsQueryOptions";
import { monstersQueryOptions } from "@/queries/monsters/monstersQueryOptions";
import { npcsQueryOptions } from "@/queries/npcs/npcsQueryOptions";
import { questsQueryOptions } from "@/queries/quests/questsQueryOptions";
import { resourcesQueryOptions } from "@/queries/resources/resourcesQueryOptions";
import { roomsQueryOptions } from "@/queries/rooms/roomsQueryOptions";
import { weaponsQueryOptions } from "@/queries/weapons/weaponsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import { SearchableItem, SearchData } from "../types/searchTypes";

export default function useSearch() {
  // Query relevant data
  const queries = {
    // Rooms
    rooms: useQuery(roomsQueryOptions()),
    // Misc Items
    miscItems: useQuery(miscItemsQueryOptions()),
    // Resources/Variants
    resources: useQuery(resourcesQueryOptions()),
    // Consumables/Variants
    consumables: useQuery(consumablesQueryOptions()),
    // Weapons/Variants
    weapons: useQuery(weaponsQueryOptions()),
    // Armors/Variants
    armors: useQuery(armorsQueryOptions()),
    // Monsters/Variants
    monsters: useQuery(monstersQueryOptions()),
    // Npcs/Vendors
    npcs: useQuery(npcsQueryOptions()),
    // Quests/Steps
    quests: useQuery(questsQueryOptions()),
  };

  // Handle errors with queries
  for (const query of Object.values(queries)) {
    if (query.isError) {
      console.error(query.error);
    }
  }

  // Return a void fn if query data is undefined
  if (
    !queries.rooms.data ||
    !queries.miscItems.data ||
    !queries.resources.data ||
    !queries.consumables.data ||
    !queries.weapons.data ||
    !queries.armors.data ||
    !queries.monsters.data ||
    !queries.npcs.data ||
    !queries.quests.data
  )
    return undefined;

  // Put data into object for fuse searching
  const formattedRoomsData: SearchableItem[] = queries.rooms.data.map(
    (room) => ({
      ...room,
      url: `/rooms/${room.id.toString()}`,
      type: "room",
    })
  );
  const searchData: SearchData = [...formattedRoomsData];

  // Create a fuse instance
  const fuse = new Fuse(searchData, {
    threshold: 0.3,
    keys: ["name"],
  });

  return fuse;
}
