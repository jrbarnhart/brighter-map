import { roomByIdQueryOptions } from "@/queries/rooms/roomsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import InfoLink from "../InfoLink/InfoLink";
import React from "react";

export default function RoomDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(roomByIdQueryOptions(id || -1)); // -1 b/c all real ids are +

  if (isLoading) {
    return (
      <div>
        <p>Loading room data...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div>
        <p>There was an error while fetching the data.</p>
      </div>
    );
  }

  return (
    <div className="text-white">
      <h2 className="font-bold text-2xl">{data.name}</h2>
      <h3>Region: {data.region.name}</h3>
      {data.portal && <p>🌐 Portal</p>}
      {data.rift && <p>🌀 Storage Rift</p>}
      {data.obelisk && <p>🏛️ Obelisk</p>}
      {data.craftingSkills.length > 0 && (
        <p>
          Crafting Stations:{" "}
          {data.craftingSkills.map((skill) => skill.name).join(", ")}
        </p>
      )}
      {data.npcs.length > 0 && (
        <p>NPC's: {data.npcs.map((npc) => npc.name).join(", ")}</p>
      )}
      <div>
        {data.npcs.some((npc) => npc.vendor) && <p>Vendors:</p>}
        {data.npcs
          .filter((npc) => npc.vendor)
          .map((npc, index, filteredArray) => (
            <React.Fragment
              key={`vendor-${npc.vendor?.name || "name"}-${npc.id.toString()}`}
            >
              <InfoLink
                to={`/vendors/${
                  npc.vendor?.id.toString() || "Id-Not-Provided"
                }`}
                variant="vendor"
              >
                {npc.vendor?.name || npc.name}
              </InfoLink>
              {index !== filteredArray.length - 1 && ", "}
            </React.Fragment>
          ))}
      </div>
      <div>
        {data.monsters.length > 0 && <p>Monsters:</p>}
        {data.monsters.map((m, index) => (
          <React.Fragment key={`${m.name}-${m.id.toString()}`}>
            <InfoLink to={`/monsters/${m.id.toString()}`} variant="monster">
              {m.name}
            </InfoLink>
            {index !== data.monsters.length - 1 && ", "}
          </React.Fragment>
        ))}
      </div>
      {data.resources.length > 0 && (
        <p>
          Resources:{" "}
          {data.resources.map((resource) => resource.name).join(", ")}
        </p>
      )}
      {data.questSteps.length > 0 && <p>Quest Steps:</p>}
      {data.questSteps.map((step) => (
        <p key={`quest-step-${step.index.toString()}-${step.id.toString()}`}>
          {step.description}
        </p>
      ))}
    </div>
  );
}
