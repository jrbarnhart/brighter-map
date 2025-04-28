import { queryOptions } from "@tanstack/react-query";
import queryConfig from "../queryConfig";
import { fetchNpcById, fetchNpcs } from "./npcs";

export const npcsKey = "npcs";

export const npcsQueryOptions = () =>
  queryOptions({
    queryKey: [npcsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchNpcs(),
  });

export const npcByIdQueryOptions = (id: number | string) =>
  queryOptions({
    queryKey: [npcsKey.concat(id.toString())],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchNpcById({ id }),
  });
