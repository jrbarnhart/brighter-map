import { queryOptions } from "@tanstack/react-query";
import queryConfig from "../queryConfig";
import { fetchResourceById } from "./resources";

export const resourcesKey = "resources";

export const resourceByIdQueryOptions = (id: number | string) =>
  queryOptions({
    queryKey: [resourcesKey.concat(id.toString())],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchResourceById({ id }),
  });
