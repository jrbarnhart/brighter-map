import { queryOptions } from "@tanstack/react-query";
import queryConfig from "../queryConfig";
import { fetchRoomById, fetchRooms } from "./rooms";

export const roomsKey = "rooms";

export const roomsQueryOptions = () =>
  queryOptions({
    queryKey: [roomsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchRooms(),
  });

export const roomByIdQueryOptions = (id: number | string) =>
  queryOptions({
    queryKey: [roomsKey.concat(id.toString())],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchRoomById({ id }),
  });
