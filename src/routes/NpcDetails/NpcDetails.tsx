import { npcByIdQueryOptions } from "@/queries/npcs/npcsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import InfoContainer from "../../components/InfoPanel/infoContents/InfoContainer";
import InfoTitle from "../../components/InfoPanel/infoContents/InfoTitle";
import InfoLabel from "../../components/InfoPanel/infoContents/InfoLabel";
import InfoLink from "../../components/InfoPanel/InfoLink/InfoLink";
import InfoRoomLinks from "@/components/InfoPanel/infoContents/InfoRoomLinks";
import InfoSkeleton from "@/components/InfoPanel/infoContents/InfoSkeleton";
import InfoQuestSteps from "@/components/InfoPanel/infoContents/InfoQuestSteps";
import InfoError from "@/components/InfoPanel/infoContents/InfoError";

export default function NpcDetails() {
  const { id } = useParams();
  const idNum = Number(id);

  const { data, isLoading, error } = useQuery(npcByIdQueryOptions(idNum));

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
      {/* Rooms */}
      <InfoRoomLinks data={data} />
      {/* Quest Steps */}
      <InfoQuestSteps data={data} />
      {/* Vendor */}
      {data.vendor && (
        <div>
          <InfoLabel>Vendor for:</InfoLabel>
          <InfoLink
            to={`/vendors/${data.vendor.id.toString()}`}
            variant="vendor"
          >
            {data.vendor.name}
          </InfoLink>
        </div>
      )}
    </InfoContainer>
  );
}
