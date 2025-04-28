import { queryOptions } from "@tanstack/react-query";
import queryConfig from "../queryConfig";
import { fetchMonsterById, fetchMonsters } from "./monsters";

export const monstersKey = "monsters";

export const monstersQueryOptions = () =>
  queryOptions({
    queryKey: [monstersKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchMonsters(),
  });

export const monsterByIdQueryOptions = (id: number | string) =>
  queryOptions({
    queryKey: [monstersKey.concat(id.toString())],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchMonsterById({ id }),
  });
