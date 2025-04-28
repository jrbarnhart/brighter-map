import axios from "axios";
import { axiosClient } from "../axiosClient";
import type { paths } from "@/lib/types/apiTypes";

export async function fetchConsumables() {
  // console.info('Fetching consumables');
  try {
    const consumableQuery = await axiosClient.get<
      paths["/items/consumables"]["get"]["responses"]["200"]["content"]["application/json"]
    >(`/items/consumables`);

    return consumableQuery.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      console.error(error);
      throw new Error(
        "An unexpected error occurred while fetching consumables."
      );
    }
  }
}

export async function fetchConsumableById({ id }: { id: string | number }) {
  // console.info('Fetching consumable by id...');
  try {
    const consumableQuery = await axiosClient.get<
      paths["/items/consumables/{id}"]["get"]["responses"]["200"]["content"]["application/json"]
    >(`/items/consumables/${id.toString()}`);

    return consumableQuery.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      console.error(error);
      throw new Error(
        "An unexpected error occurred while fetching consumable by id."
      );
    }
  }
}
