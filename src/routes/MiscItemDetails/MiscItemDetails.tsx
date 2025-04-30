import InfoContainer from "@/components/InfoPanel/infoContents/InfoContainer";
import InfoLabel from "@/components/InfoPanel/infoContents/InfoLabel";
import InfoTitle from "@/components/InfoPanel/infoContents/InfoTitle";
import InfoLink from "@/components/InfoPanel/InfoLink/InfoLink";
import { miscItemByIdQueryOptions } from "@/queries/miscItems/miscItemsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function MiscItemDetails() {
  const { id } = useParams();
  const idNum = Number(id);

  const { data, isLoading, error } = useQuery(miscItemByIdQueryOptions(idNum));

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
      <div>
        <InfoLabel>Vendors:</InfoLabel>
        {data.vendors.map((vendor) => (
          <InfoLink
            to={`/vendors/${vendor.id.toString()}`}
            key={vendor.id}
            variant="vendor"
          >
            {vendor.name || `Vendor ${vendor.id.toString()}`}
          </InfoLink>
        ))}
      </div>
      {/* TODO: Add links to monsters that drop this resoruce */}
    </InfoContainer>
  );
}
