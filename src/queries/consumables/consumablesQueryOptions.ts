import { queryOptions } from "@tanstack/react-query";
import queryConfig from "../queryConfig";
import { fetchConsumableById, fetchConsumables } from "./consumables";

export const consumablesKey = "consumables";

export const consumablesQueryOptions = () =>
  queryOptions({
    queryKey: [consumablesKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchConsumables(),
  });

export const consumableByIdQueryOptions = (id: number | string) =>
  queryOptions({
    queryKey: [consumablesKey.concat(id.toString())],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchConsumableById({ id }),
  });
