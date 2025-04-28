import { queryOptions } from "@tanstack/react-query";
import queryConfig from "../queryConfig";
import { fetchArmorById, fetchArmors } from "./armors";

export const armorsKey = "armors";

export const armorsQueryOptions = () =>
  queryOptions({
    queryKey: [armorsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchArmors(),
  });

export const armorByIdQueryOptions = (id: number | string) =>
  queryOptions({
    queryKey: [armorsKey.concat(id.toString())],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchArmorById({ id }),
  });
