import InfoContainer from "@/components/InfoPanel/infoContents/InfoContainer";
import InfoError from "@/components/InfoPanel/infoContents/InfoError";
import InfoLabel from "@/components/InfoPanel/infoContents/InfoLabel";
import InfoSkeleton from "@/components/InfoPanel/infoContents/InfoSkeleton";
import InfoTitle from "@/components/InfoPanel/infoContents/InfoTitle";
import { weaponByIdQueryOptions } from "@/queries/weapons/weaponsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";

export default function WeaponDetails() {
  const { id } = useParams();
  const idNum = Number(id);

  const { data, isLoading, error } = useQuery(weaponByIdQueryOptions(idNum));

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
      <InfoTitle>{data.name}</InfoTitle>
      {/* Faction */}
      <div className="flex items-baseline gap-2">
        <InfoLabel>Faction:</InfoLabel>
        <p>{data.faction}</p>
      </div>
      {/* Element */}
      <div className="flex items-baseline gap-2">
        <InfoLabel>Element:</InfoLabel>
        <p>{data.element}</p>
      </div>
      {/* Ranged */}
      <div className="flex items-baseline gap-2">
        <InfoLabel>Ranged: {data.isRanged ? "✅ Yes" : "❌ No"}</InfoLabel>
      </div>
      {/* Two Handed */}
      <div className="flex items-baseline gap-2">
        <InfoLabel>
          Two Handed: {data.isTwoHanded ? "✅ Yes" : "❌ No"}
        </InfoLabel>
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
