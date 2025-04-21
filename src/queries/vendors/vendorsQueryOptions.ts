import { queryOptions } from "@tanstack/react-query";
import queryConfig from "../queryConfig";
import { fetchVendorById } from "./vendors";

export const vendorsKey = "vendors";

export const vendorByIdQueryOptions = (id: number | string) =>
  queryOptions({
    queryKey: [vendorsKey.concat(id.toString())],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchVendorById({ id }),
  });
