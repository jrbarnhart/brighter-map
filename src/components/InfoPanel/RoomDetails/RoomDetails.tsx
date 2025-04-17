import { roomByIdQueryOptions } from "@/queries/rooms/roomsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function RoomDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(roomByIdQueryOptions(id || -1)); // -1 b/c all real ids are +

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

  return (
    <div className="text-white">
      <h2 className="font-bold text-2xl">{data.name}</h2>
      <h3>Region: {data.region.name}</h3>
      {data.portal && <p>🌐 Portal</p>}
      {data.rift && <p>🌀 Storage Rift</p>}
      {data.obelisk && <p>🏛️ Obelisk</p>}
      {data.craftingSkills.length > 0 && (
        <p>
          Crafting Stations:{" "}
          {data.craftingSkills.map((skill) => skill.name).join(", ")}
        </p>
      )}
      {data.npcs.length > 0 && (
        <p>NPC's: {data.npcs.map((npc) => npc.name).join(", ")}</p>
      )}
      {data.monsters.length > 0 && (
        <p>
          Monsters: {data.monsters.map((monster) => monster.name).join(", ")}
        </p>
      )}
      {data.resources.length > 0 && (
        <p>
          Resources:{" "}
          {data.resources.map((resource) => resource.name).join(", ")}
        </p>
      )}
      {data.questSteps.length > 0 && <p>Quest Steps:</p>}
      {data.questSteps.map((step) => (
        <p key={`quest-step-${step.index.toString()}-${step.id.toString()}`}>
          {step.description}
        </p>
      ))}
    </div>
  );
}
