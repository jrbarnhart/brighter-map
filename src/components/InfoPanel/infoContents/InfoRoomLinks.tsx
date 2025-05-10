import MapLink from "@/components/MapLink/MapLink";
import InfoLink from "../InfoLink/InfoLink";
import InfoLabel from "./InfoLabel";
import { InfoPanelContext } from "../InfoPanel";
import { useOutletContext } from "react-router";

type InfoRoomLinksProps = {
  data: { rooms: Array<{ name: string; id: number }> };
};

export default function InfoRoomLinks({ data }: InfoRoomLinksProps) {
  const context: InfoPanelContext | undefined = useOutletContext();
  const { setInfoOpen } = context || {
    setInfoOpen: undefined,
  };

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
          <MapLink roomId={room.id} setInfoOpen={setInfoOpen} />
        </div>
      ))}
    </div>
  );
}
