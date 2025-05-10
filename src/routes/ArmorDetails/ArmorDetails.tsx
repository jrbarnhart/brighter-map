import InfoContainer from "@/components/InfoPanel/infoContents/InfoContainer";
import InfoLabel from "@/components/InfoPanel/infoContents/InfoLabel";
import InfoSkeleton from "@/components/InfoPanel/infoContents/InfoSkeleton";
import InfoTitle from "@/components/InfoPanel/infoContents/InfoTitle";
import { armorByIdQueryOptions } from "@/queries/armors/armorsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";

export default function ArmorDetails() {
  const { id } = useParams();
  const idNum = Number(id);

  const { data, isLoading, error } = useQuery(armorByIdQueryOptions(idNum));

  if (isLoading) {
    return <InfoSkeleton />;
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
      {/* Faction */}
      <div className="flex items-baseline gap-2">
        <InfoLabel>Faction:</InfoLabel>
        <p>{data.faction}</p>
      </div>
      {/* Slot */}
      <div className="flex items-baseline gap-2">
        <InfoLabel>Slot:</InfoLabel>
        <p>{data.slot}</p>
      </div>
      {/* Variants */}
      <div>
        <InfoLabel>Variants:</InfoLabel>
        {data.variants.map((v) => (
          <React.Fragment key={`${v.name}-${v.id.toString()}`}>
            <p>
              {v.name} {data.name}
            </p>
          </React.Fragment>
        ))}
      </div>
    </InfoContainer>
  );
}
