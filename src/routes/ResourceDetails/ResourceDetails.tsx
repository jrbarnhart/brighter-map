import InfoContainer from "@/components/InfoPanel/infoContents/InfoContainer";
import InfoTitle from "@/components/InfoPanel/infoContents/InfoTitle";
import { resourceByIdQueryOptions } from "@/queries/resources/resourcesQueryOptions";
import { useQuery } from "@tanstack/react-query";
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
    </InfoContainer>
  );
}
