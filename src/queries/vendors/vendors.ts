import axios from "axios";
import { axiosClient } from "../axiosClient";
import type { paths } from "@/lib/types/apiTypes";

export async function fetchVendorById({ id }: { id: string | number }) {
  // console.info('Fetching vendor by id...');
  try {
    const vendorQuery = await axiosClient.get<
      paths["/npcs/vendors/{id}"]["get"]["responses"]["200"]["content"]["application/json"]
    >(`/npcs/vendors/${id.toString()}`);

    return vendorQuery.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      console.error(error);
      throw new Error(
        "An unexpected error occurred while fetching vendor by id."
      );
    }
  }
}
