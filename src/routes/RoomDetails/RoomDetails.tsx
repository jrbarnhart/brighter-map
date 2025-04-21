import { roomByIdQueryOptions } from "@/queries/rooms/roomsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import InfoLink from "../../components/InfoPanel/InfoLink/InfoLink";
import React from "react";
import InfoContainer from "../../components/InfoPanel/infoContents/InfoContainer";
import InfoTitle from "../../components/InfoPanel/infoContents/InfoTitle";
import InfoLabel from "../../components/InfoPanel/infoContents/InfoLabel";

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
    <InfoContainer>
      <InfoTitle>{data.name}</InfoTitle>
      <div className="flex items-baseline gap-2">
        <InfoLabel>Region: </InfoLabel>
        <p>{data.region.name}</p>
      </div>
      {data.portal && <InfoLabel>🌐 Portal</InfoLabel>}
      {data.rift && <InfoLabel>🌀 Storage Rift</InfoLabel>}
      {data.obelisk && <InfoLabel>🏛️ Obelisk</InfoLabel>}
      {data.craftingSkills.length > 0 && (
        <>
          <InfoLabel>Crafting Stations: </InfoLabel>
          <p>{data.craftingSkills.map((skill) => skill.name).join(", ")}</p>
        </>
      )}
      {data.npcs.length > 0 && (
        <>
          <InfoLabel>NPC's:</InfoLabel>
          {data.npcs.map((n, index) => (
            <React.Fragment key={`${n.name}-${n.id.toString()}`}>
              <InfoLink to={`/npcs/${n.id.toString()}`} variant="npc">
                {n.name}
              </InfoLink>
              {index !== data.npcs.length - 1 && ", "}
            </React.Fragment>
          ))}
        </>
      )}
      <div>
        {data.npcs.some((npc) => npc.vendor) && <InfoLabel>Vendors:</InfoLabel>}
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
        {data.monsters.length > 0 && <InfoLabel>Monsters:</InfoLabel>}
        {data.monsters.map((m, index) => (
          <React.Fragment key={`${m.name}-${m.id.toString()}`}>
            <InfoLink to={`/monsters/${m.id.toString()}`} variant="monster">
              {m.name}
            </InfoLink>
            {index !== data.monsters.length - 1 && ", "}
          </React.Fragment>
        ))}
      </div>
      {data.resources.length > 0 && <InfoLabel>Resources: </InfoLabel>}
      {data.resources.map((r, index) => (
        <React.Fragment key={`${r.name}-${r.id.toString()}`}>
          <InfoLink to={`/resources/${r.id.toString()}`} variant="resource">
            {r.name}
          </InfoLink>
          {index !== data.resources.length - 1 && ", "}
        </React.Fragment>
      ))}
      {data.questSteps.length > 0 && <InfoLabel>Quest Steps:</InfoLabel>}
      {data.questSteps.map((step) => (
        <p key={`quest-step-${step.index.toString()}-${step.id.toString()}`}>
          {step.description}
        </p>
      ))}
    </InfoContainer>
  );
}
