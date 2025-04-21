import axios from "axios";
import { axiosClient } from "../axiosClient";
import type { paths } from "@/lib/types/apiTypes";

export async function fetchResourceById({ id }: { id: string | number }) {
  // console.info('Fetching resource by id...');
  try {
    const resourceQuery = await axiosClient.get<
      paths["/items/resources/{id}"]["get"]["responses"]["200"]["content"]["application/json"]
    >(`/items/resources/${id.toString()}`);

    return resourceQuery.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      console.error(error);
      throw new Error(
        "An unexpected error occurred while fetching resource by id."
      );
    }
  }
}
