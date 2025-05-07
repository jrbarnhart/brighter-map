import {
  Arborae,
  Cryonae,
  Impact,
  Infernae,
  Necromae,
  Passive,
  Tempestae,
} from "@/assets/gameIcons";
import { components } from "@/lib/types/apiTypes";
import { monsterByIdQueryOptions } from "@/queries/monsters/monstersQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { XCircle } from "lucide-react";
import { useParams } from "react-router";
import React from "react";
import InfoContainer from "../../components/InfoPanel/infoContents/InfoContainer";
import InfoTitle from "../../components/InfoPanel/infoContents/InfoTitle";
import InfoLabel from "../../components/InfoPanel/infoContents/InfoLabel";
import InfoRoomLinks from "@/components/InfoPanel/infoContents/InfoRoomLinks";

export default function MonsterDetails() {
  const { id } = useParams();
  const idNum = Number(id);

  const { data, isLoading, error } = useQuery(monsterByIdQueryOptions(idNum));

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

  type IconMap = {
    [key in components["schemas"]["AttackElementsEnum"]["value"]]: React.ReactNode;
  };

  const iconMap: IconMap = {
    ARBORAE: <Arborae />,
    CRYONAE: <Cryonae />,
    INFERNAE: <Infernae />,
    NECROMAE: <Necromae />,
    TEMPESTAE: <Tempestae />,
    IMPACT: <Impact />,
    NONE: <XCircle className="h-full w-min" />,
  };

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
      {/* Region */}
      <div className="flex items-baseline gap-2">
        <InfoLabel>Region: </InfoLabel>
        <p>{data.region.name}</p>
      </div>
      {/* Rooms */}
      <InfoRoomLinks data={data} />
      {/* Elements */}
      <div className="grid grid-cols-[min-content_min-content_1fr] gap-4 items-center whitespace-nowrap">
        <InfoLabel>Attacks: </InfoLabel>
        <div className="h-10 w-10">{iconMap[data.attackElement]}</div>
        {data.attackElement}
        <InfoLabel>Immune to: </InfoLabel>
        <div className="h-10 w-10">{iconMap[data.immuneElement]}</div>
        {data.immuneElement}
        <InfoLabel>Vulnerable to: </InfoLabel>
        <div className="h-10 w-10">{iconMap[data.vulnerableElement]}</div>
        {data.vulnerableElement}
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
