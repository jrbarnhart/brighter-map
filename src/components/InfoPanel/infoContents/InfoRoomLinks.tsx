import MapLink from "@/components/MapLink/MapLink";
import InfoLink from "../InfoLink/InfoLink";
import InfoLabel from "./InfoLabel";

type InfoRoomLinksProps = {
  data: { rooms: Array<{ name: string; id: number }> };
};

export default function InfoRoomLinks({ data }: InfoRoomLinksProps) {
  return (
    <div className="grid gap-2">
      <InfoLabel>Rooms:</InfoLabel>
      {data.rooms.map((room) => (
        <div
          key={`${room.name}-${room.id.toString()}`}
          className="flex gap-2 items-center"
        >
          <InfoLink to={`/rooms/${room.id.toString()}`} variant="room">
            {room.name}
          </InfoLink>
          <MapLink roomId={room.id} />
        </div>
      ))}
    </div>
  );
}
