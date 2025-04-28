import { queryOptions } from "@tanstack/react-query";
import queryConfig from "../queryConfig";
import { fetchMiscItemById, fetchMiscItems } from "./miscItems";

export const miscItemsKey = "misc-items";

export const miscItemsQueryOptions = () =>
  queryOptions({
    queryKey: [miscItemsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchMiscItems(),
  });

export const miscItemByIdQueryOptions = (id: number | string) =>
  queryOptions({
    queryKey: [miscItemsKey.concat(id.toString())],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchMiscItemById({ id }),
  });
