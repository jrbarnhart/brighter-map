import axios from "axios";
import { axiosClient } from "../axiosClient";
import type { paths } from "@/lib/types/apiTypes";

export async function fetchArmors() {
  // console.info('Fetching armors');
  try {
    const armorQuery = await axiosClient.get<
      paths["/items/armors"]["get"]["responses"]["200"]["content"]["application/json"]
    >(`/items/armors`);

    return armorQuery.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      console.error(error);
      throw new Error("An unexpected error occurred while fetching armors.");
    }
  }
}

export async function fetchArmorById({ id }: { id: string | number }) {
  // console.info('Fetching armor by id...');
  try {
    const armorQuery = await axiosClient.get<
      paths["/items/armors/{id}"]["get"]["responses"]["200"]["content"]["application/json"]
    >(`/items/armors/${id.toString()}`);

    return armorQuery.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      console.error(error);
      throw new Error(
        "An unexpected error occurred while fetching armor by id."
      );
    }
  }
}
