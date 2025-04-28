import { queryOptions } from "@tanstack/react-query";
import queryConfig from "../queryConfig";
import { fetchWeaponById, fetchWeapons } from "./weapons";

export const weaponsKey = "weapons";

export const weaponsQueryOptions = () =>
  queryOptions({
    queryKey: [weaponsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchWeapons(),
  });

export const weaponByIdQueryOptions = (id: number | string) =>
  queryOptions({
    queryKey: [weaponsKey.concat(id.toString())],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchWeaponById({ id }),
  });
