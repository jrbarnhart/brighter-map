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
import { MonsterByIdQueryOptions } from "@/queries/monsters/monstersQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { TriangleAlert, XCircle } from "lucide-react";
import { useParams } from "react-router";
import InfoLink from "../InfoLink/InfoLink";
import React from "react";

export default function MonsterDetails() {
  const { id } = useParams();
  const idNum = Number(id);

  const { data, isLoading, error } = useQuery(MonsterByIdQueryOptions(idNum));

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
    <div className="text-white">
      <h2 className="font-bold text-2xl">{data.name}</h2>
      <div className="flex items-center gap-3 h-8">
        {data.passive ? (
          <>
            <p>Passive </p>
            <Passive />
          </>
        ) : (
          <>
            <p>Aggressive </p>
            <TriangleAlert className="h-full w-min text-red-500" />
          </>
        )}
      </div>
      <h3>Region: {data.region.name}</h3>
      <div>
        {data.rooms.map((r, index) => (
          <React.Fragment key={`${r.name}-${r.id.toString()}`}>
            <InfoLink to={`/rooms/${r.id.toString()}`} variant="room">
              {r.name}
            </InfoLink>
            {index < data.rooms.length - 1 && ", "}
          </React.Fragment>
        ))}
      </div>
      <div className="grid grid-cols-[min-content_min-content_1fr] gap-4 items-center whitespace-nowrap">
        <h3>Attacks: </h3>
        <div className="h-10 w-10">{iconMap[data.attackElement]}</div>
        {data.attackElement}
        <h3>Immune to: </h3>
        <div className="h-10 w-10">{iconMap[data.immuneElement]}</div>
        {data.immuneElement}
        <h3>Vulnerable to: </h3>
        <div className="h-10 w-10">{iconMap[data.vulnerableElement]}</div>
        {data.vulnerableElement}
      </div>
      <div>
        <h3>Variants:</h3>
        {data.variants.map((v) => (
          <React.Fragment key={`${v.name}-${v.id.toString()}`}>
            <p>
              {v.name} {data.name}
            </p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
