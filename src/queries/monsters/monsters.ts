import axios from "axios";
import { axiosClient } from "../axiosClient";
import type { paths } from "@/lib/types/apiTypes";

export async function fetchMonsters() {
  // console.info('Fetching monsters');
  try {
    const monsterQuery = await axiosClient.get<
      paths["/monsters"]["get"]["responses"]["200"]["content"]["application/json"]
    >(`/monsters`);

    return monsterQuery.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      console.error(error);
      throw new Error("An unexpected error occurred while fetching monsters.");
    }
  }
}

export async function fetchMonsterById({ id }: { id: string | number }) {
  // console.info('Fetching monster by id...');
  try {
    const monsterQuery = await axiosClient.get<
      paths["/monsters/{id}"]["get"]["responses"]["200"]["content"]["application/json"]
    >(`/monsters/${id.toString()}`);

    return monsterQuery.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      console.error(error);
      throw new Error(
        "An unexpected error occurred while fetching monster by id."
      );
    }
  }
}
