import {
  Arborae,
  Cryonae,
  Impact,
  Infernae,
  Necromae,
  Tempestae,
} from "@/assets/gameIcons";
import { components } from "@/lib/types/apiTypes";
import { MonsterByIdQueryOptions } from "@/queries/monsters/monstersQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { XCircle } from "lucide-react";
import { useParams } from "react-router";
import InfoLink from "../InfoLink/InfoLink";

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
      <h3>Region: {data.region.name}</h3>
      <div>
        {data.rooms.map((r) => (
          <InfoLink
            to={`/rooms/${r.id.toString()}`}
            key={`${r.name}-${r.id.toString()}`}
            variant="room"
          >
            {r.name}
          </InfoLink>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <p>Attacks: {data.attackElement}</p>
        <div className="h-10 w-10">{iconMap[data.attackElement]}</div>
      </div>
      <div className="flex gap-2 items-center">
        <p>Immune to: {data.immuneElement}</p>
        <div className="h-10 w-10">{iconMap[data.immuneElement]}</div>
      </div>
    </div>
  );
}
