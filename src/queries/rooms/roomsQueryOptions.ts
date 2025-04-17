import { queryOptions } from "@tanstack/react-query";
import queryConfig from "../queryConfig";
import { fetchRoomById } from "./rooms";

export const roomsKey = "rooms";

export const roomByIdQueryOptions = (id: number | string) =>
  queryOptions({
    queryKey: [roomsKey.concat(id.toString())],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchRoomById({ id }),
  });
