import { queryOptions } from "@tanstack/react-query";
import queryConfig from "../queryConfig";
import { fetchMonsterById } from "./monsters";

export const monstersKey = "monsters";

export const MonsterByIdQueryOptions = (id: number | string) =>
  queryOptions({
    queryKey: [monstersKey.concat(id.toString())],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchMonsterById({ id }),
  });
