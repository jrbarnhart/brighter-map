import { Passive } from "@/assets/gameIcons";
import InfoContainer from "@/components/InfoPanel/infoContents/InfoContainer";
import InfoError from "@/components/InfoPanel/infoContents/InfoError";
import InfoLabel from "@/components/InfoPanel/infoContents/InfoLabel";
import InfoRoomLinks from "@/components/InfoPanel/infoContents/InfoRoomLinks";
import InfoSkeleton from "@/components/InfoPanel/infoContents/InfoSkeleton";
import InfoTitle from "@/components/InfoPanel/infoContents/InfoTitle";
import { resourceByIdQueryOptions } from "@/queries/resources/resourcesQueryOptions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";

export default function ResourceDetails() {
  const { id } = useParams();
  const idNum = Number(id);

  const { data, isLoading, error } = useQuery(resourceByIdQueryOptions(idNum));

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
      {/* Passive */}
      {data.passive && (
        <div className="flex items-center gap-3 h-8">
          <InfoLabel>Passive </InfoLabel>
          <Passive />
        </div>
      )}
      {/* Skill */}
      <div className="flex items-baseline gap-2">
        <InfoLabel>Skill:</InfoLabel>
        <p>{data.skill.name}</p>
      </div>
      {/* Rooms */}
      <InfoRoomLinks data={data} />
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
