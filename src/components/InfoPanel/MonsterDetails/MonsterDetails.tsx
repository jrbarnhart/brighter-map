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
import { X } from "lucide-react";
import { useParams } from "react-router";
import InfoLink from "../InfoLink/InfoLink";

export default function MonsterDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(
    MonsterByIdQueryOptions(id || -1)
  ); // -1 b/c all real ids are +

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
    NONE: <X />,
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
      <div className="flex items-center">
        <p>Attacks: {data.attackElement}</p>
        {iconMap[data.attackElement]}
      </div>
    </div>
  );
}
