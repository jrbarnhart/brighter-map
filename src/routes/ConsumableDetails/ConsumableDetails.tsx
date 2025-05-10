import InfoContainer from "@/components/InfoPanel/infoContents/InfoContainer";
import InfoLabel from "@/components/InfoPanel/infoContents/InfoLabel";
import InfoSkeleton from "@/components/InfoPanel/infoContents/InfoSkeleton";
import InfoTitle from "@/components/InfoPanel/infoContents/InfoTitle";
import { consumableByIdQueryOptions } from "@/queries/consumables/consumablesQueryOptions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";

export default function ConsumableDetails() {
  const { id } = useParams();
  const idNum = Number(id);

  const { data, isLoading, error } = useQuery(
    consumableByIdQueryOptions(idNum)
  );

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
      {/* Skill */}
      {data.skill && (
        <div className="flex items-baseline gap-2">
          <InfoLabel>Skill:</InfoLabel>
          <p>{data.skill.name}</p>
        </div>
      )}
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
