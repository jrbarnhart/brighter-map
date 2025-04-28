import axios from "axios";
import { axiosClient } from "../axiosClient";
import type { paths } from "@/lib/types/apiTypes";

export async function fetchWeapons() {
  // console.info('Fetching weapons');
  try {
    const weaponQuery = await axiosClient.get<
      paths["/items/weapons"]["get"]["responses"]["200"]["content"]["application/json"]
    >(`/items/weapons`);

    return weaponQuery.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      console.error(error);
      throw new Error("An unexpected error occurred while fetching weapons.");
    }
  }
}

export async function fetchWeaponById({ id }: { id: string | number }) {
  // console.info('Fetching weapon by id...');
  try {
    const weaponQuery = await axiosClient.get<
      paths["/items/weapons/{id}"]["get"]["responses"]["200"]["content"]["application/json"]
    >(`/items/weapons/${id.toString()}`);

    return weaponQuery.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      console.error(error);
      throw new Error(
        "An unexpected error occurred while fetching weapon by id."
      );
    }
  }
}
