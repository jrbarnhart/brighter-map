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
import Fuse, { FuseResult } from "fuse.js";
import { SearchableItem, SearchData } from "../types/searchTypes";
import { useCallback, useMemo, useState } from "react";

export default function useSearch() {
  const [results, setResults] = useState<FuseResult<SearchableItem>[] | null>(
    null
  );

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

  // Memoize the fuse instance and its search data
  const fuse = useMemo(() => {
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
      return null;

    // Format data and combine into searchData
    const formattedRooms: SearchableItem[] = queries.rooms.data.map((room) => ({
      ...room,
      url: `/rooms/${room.id.toString()}`,
      type: "room",
    }));
    const formattedMiscItems: SearchableItem[] = queries.miscItems.data.map(
      (miscItem) => ({
        ...miscItem,
        url: `/misc/${miscItem.id.toString()}`,
        type: "miscItem",
      })
    );
    const formattedResources: SearchableItem[] = queries.resources.data.map(
      (resource) => ({
        ...resource,
        url: `/resources/${resource.id.toString()}`,
        type: "resource",
      })
    );
    const formattedConsumables: SearchableItem[] = queries.consumables.data.map(
      (consumable) => ({
        ...consumable,
        url: `/consumables/${consumable.id.toString()}`,
        type: "consumable",
      })
    );
    const formattedWeapons: SearchableItem[] = queries.weapons.data.map(
      (weapon) => ({
        ...weapon,
        url: `/weapons/${weapon.id.toString()}`,
        type: "weapon",
      })
    );
    const formattedArmors: SearchableItem[] = queries.armors.data.map(
      (armor) => ({
        ...armor,
        url: `/armors/${armor.id.toString()}`,
        type: "armor",
      })
    );
    const formattedMonsters: SearchableItem[] = queries.monsters.data.map(
      (monster) => ({
        ...monster,
        url: `/monsters/${monster.id.toString()}`,
        type: "monster",
      })
    );
    const formattedNpcs: SearchableItem[] = queries.npcs.data.map((npc) => ({
      ...npc,
      url: `/npcs/${npc.id.toString()}`,
      type: "npc",
    }));
    const formattedVendors: SearchableItem[] = queries.npcs.data
      .filter(
        (npc): npc is typeof npc & { vendor: NonNullable<typeof npc.vendor> } =>
          Boolean(npc.vendor)
      )
      .map((npc) => ({
        ...npc.vendor,
        url: `/vendors/${npc.vendor.id.toString()}`,
        type: "vendor",
      }));
    const formattedQuests: SearchableItem[] = queries.quests.data.map(
      (quest) => ({
        ...quest,
        url: `/quests/${quest.id.toString()}`,
        type: "quest",
      })
    );

    const searchData: SearchData = [
      ...formattedRooms,
      ...formattedMiscItems,
      ...formattedResources,
      ...formattedConsumables,
      ...formattedWeapons,
      ...formattedArmors,
      ...formattedMonsters,
      ...formattedNpcs,
      ...formattedVendors,
      ...formattedQuests,
    ];

    // Create a fuse instance
    const fuse = new Fuse(searchData, {
      threshold: 0.3,
      keys: ["name", "variants.name"],
    });

    return fuse;
  }, [
    queries.armors.data,
    queries.consumables.data,
    queries.miscItems.data,
    queries.monsters.data,
    queries.npcs.data,
    queries.quests.data,
    queries.resources.data,
    queries.rooms.data,
    queries.weapons.data,
  ]);

  const searchHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!fuse) return;
      const searchResults = fuse.search(e.target.value).slice(0, 10);
      setResults(searchResults);
    },
    [fuse]
  );

  return { results, searchHandler };
}
