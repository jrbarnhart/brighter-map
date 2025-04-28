import axios from "axios";
import { axiosClient } from "../axiosClient";
import type { paths } from "@/lib/types/apiTypes";

export async function fetchNpcs() {
  // console.info('Fetching npcs');
  try {
    const npcQuery = await axiosClient.get<
      paths["/npcs"]["get"]["responses"]["200"]["content"]["application/json"]
    >(`/npcs`);

    return npcQuery.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      console.error(error);
      throw new Error("An unexpected error occurred while fetching npcs.");
    }
  }
}

export async function fetchNpcById({ id }: { id: string | number }) {
  // console.info('Fetching npc by id...');
  try {
    const npcQuery = await axiosClient.get<
      paths["/npcs/{id}"]["get"]["responses"]["200"]["content"]["application/json"]
    >(`/npcs/${id.toString()}`);

    return npcQuery.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      console.error(error);
      throw new Error("An unexpected error occurred while fetching npc by id.");
    }
  }
}
