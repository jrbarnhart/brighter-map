import { roomByIdQueryOptions } from "@/queries/rooms/roomsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext, useParams } from "react-router";
import InfoLink from "../../components/InfoPanel/InfoLink/InfoLink";
import React from "react";
import InfoContainer from "../../components/InfoPanel/infoContents/InfoContainer";
import InfoTitle from "../../components/InfoPanel/infoContents/InfoTitle";
import InfoLabel from "../../components/InfoPanel/infoContents/InfoLabel";
import InfoSkeleton from "@/components/InfoPanel/infoContents/InfoSkeleton";
import InfoQuestSteps from "@/components/InfoPanel/infoContents/InfoQuestSteps";
import MapLink from "@/components/MapLink/MapLink";
import { InfoPanelContext } from "@/components/InfoPanel/InfoPanel";
import InfoError from "@/components/InfoPanel/infoContents/InfoError";

export default function RoomDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(roomByIdQueryOptions(id || -1)); // -1 b/c all real ids are +
  const context: InfoPanelContext | undefined = useOutletContext();
  const { setInfoOpen, screenSize } = context || {};

  if (isLoading) {
    return <InfoSkeleton />;
  }

  if (error) {
    return <InfoError error={error} />;
  }

  if (!data) {
    return <InfoError error={new Error("Data not found.")} />;
  }

  return (
    <InfoContainer>
      <div className="flex items-center gap-3">
        <InfoTitle>{data.name}</InfoTitle>
        <MapLink
          roomId={data.id}
          setInfoOpen={setInfoOpen}
          closeInfo={screenSize && screenSize.width <= 768}
        />
      </div>
      {/* Region */}
      <div className="flex items-baseline gap-2">
        <InfoLabel>Region: </InfoLabel>
        <p>{data.region.name}</p>
      </div>
      {/* Portal, Rift, Obelisk */}
      {data.portal && <InfoLabel>🌐 Portal</InfoLabel>}
      {data.rift && <InfoLabel>🌀 Storage Rift</InfoLabel>}
      {data.obelisk && <InfoLabel>🏛️ Obelisk</InfoLabel>}
      {/* Crafting stations */}
      {data.craftingSkills.length > 0 && (
        <div>
          <InfoLabel>Crafting Stations: </InfoLabel>
          <p>{data.craftingSkills.map((skill) => skill.name).join(", ")}</p>
        </div>
      )}
      {/* NPC's */}
      {data.npcs.length > 0 && (
        <div>
          <InfoLabel>NPC's:</InfoLabel>
          {data.npcs.map((n, index) => (
            <React.Fragment key={`${n.name}-${n.id.toString()}`}>
              <InfoLink to={`/npcs/${n.id.toString()}`} variant="npc">
                {n.name}
              </InfoLink>
              {index !== data.npcs.length - 1 && ", "}
            </React.Fragment>
          ))}
        </div>
      )}
      {/* Vendors */}
      {data.npcs.some((npc) => npc.vendor) && (
        <div>
          <InfoLabel>Vendors:</InfoLabel>
          {data.npcs
            .filter((npc) => npc.vendor)
            .map((npc, index, filteredArray) => (
              <React.Fragment
                key={`vendor-${
                  npc.vendor?.name || "name"
                }-${npc.id.toString()}`}
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
      )}
      {data.monsters.length > 0 && (
        <div>
          <InfoLabel>Monsters:</InfoLabel>
          {data.monsters.map((m, index) => (
            <React.Fragment key={`${m.name}-${m.id.toString()}`}>
              <InfoLink to={`/monsters/${m.id.toString()}`} variant="monster">
                {m.name}
              </InfoLink>
              {index !== data.monsters.length - 1 && ", "}
            </React.Fragment>
          ))}
        </div>
      )}
      {/* Resources */}
      {data.resources.length > 0 && (
        <div>
          <InfoLabel>Resources: </InfoLabel>
          {data.resources.map((r, index) => (
            <React.Fragment key={`${r.name}-${r.id.toString()}`}>
              <InfoLink to={`/resources/${r.id.toString()}`} variant="resource">
                {r.name}
              </InfoLink>
              {index !== data.resources.length - 1 && ", "}
            </React.Fragment>
          ))}
        </div>
      )}
      {/* Quest Steps */}
      <InfoQuestSteps data={data} />
    </InfoContainer>
  );
}
