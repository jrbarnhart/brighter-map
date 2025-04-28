import { queryOptions } from "@tanstack/react-query";
import queryConfig from "../queryConfig";
import { fetchQuestById, fetchQuests } from "./quests";

export const questsKey = "quests";

export const questsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [questsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchQuests(),
    enabled,
  });

export const questByIdQueryOptions = (id: number | string) =>
  queryOptions({
    queryKey: [questsKey.concat(id.toString())],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchQuestById({ id }),
  });
