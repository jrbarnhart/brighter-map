import { vendorByIdQueryOptions } from "@/queries/vendors/vendorsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function VendorDetails() {
  const { id } = useParams();
  const idNum = Number(id);

  const { data, isLoading, error } = useQuery(vendorByIdQueryOptions(idNum));

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
}
