import { Passive } from "@/assets/gameIcons";
import InfoContainer from "@/components/InfoPanel/infoContents/InfoContainer";
import InfoLabel from "@/components/InfoPanel/infoContents/InfoLabel";
import InfoTitle from "@/components/InfoPanel/infoContents/InfoTitle";
import InfoLink from "@/components/InfoPanel/InfoLink/InfoLink";
import { resourceByIdQueryOptions } from "@/queries/resources/resourcesQueryOptions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";

export default function ResourceDetails() {
  const { id } = useParams();
  const idNum = Number(id);

  const { data, isLoading, error } = useQuery(resourceByIdQueryOptions(idNum));

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
      {data.rooms.length > 0 && (
        <div>
          <InfoLabel>Rooms:</InfoLabel>
          {data.rooms.map((r, index) => (
            <React.Fragment key={`${r.name}-${r.id.toString()}`}>
              <InfoLink to={`/rooms/${r.id.toString()}`} variant="room">
                {r.name}
              </InfoLink>
              {index !== data.rooms.length - 1 && ", "}
            </React.Fragment>
          ))}
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
