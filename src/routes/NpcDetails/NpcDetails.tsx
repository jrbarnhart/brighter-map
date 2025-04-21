import { npcByIdQueryOptions } from "@/queries/npcs/npcsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import InfoContainer from "../../components/InfoPanel/infoContents/InfoContainer";
import InfoTitle from "../../components/InfoPanel/infoContents/InfoTitle";
import InfoLabel from "../../components/InfoPanel/infoContents/InfoLabel";
import React from "react";
import InfoLink from "../../components/InfoPanel/InfoLink/InfoLink";

export default function NpcDetails() {
  const { id } = useParams();
  const idNum = Number(id);

  const { data, isLoading, error } = useQuery(npcByIdQueryOptions(idNum));

  if (isLoading) {
    return (
      <div>
        <p>Loading data...</p>
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
      {data.rooms.length > 0 && <InfoLabel>Rooms:</InfoLabel>}
      {data.rooms.map((r, index) => (
        <React.Fragment key={`${r.name}-${r.id.toString()}`}>
          <InfoLink to={`/rooms/${r.id.toString()}`} variant="room">
            {r.name}
          </InfoLink>
          {index !== data.rooms.length - 1 && ", "}
        </React.Fragment>
      ))}
      {data.questSteps.length > 0 && <InfoLabel>Quest Steps</InfoLabel>}
      {data.questSteps.map((s) => (
        <p key={`${s.questId.toString()}-${s.id.toString()}`}>
          {s.description} - Quest Name{" "}
          {/* TODO: Replace with actual quest name after API update */}
        </p>
      ))}
      {data.vendor && (
        <>
          <InfoLabel>Vendor for:</InfoLabel>
          <InfoLink
            to={`/vendors/${data.vendor.id.toString()}`}
            variant="vendor"
          >
            {data.vendor.name}
          </InfoLink>
        </>
      )}
    </InfoContainer>
  );
}
