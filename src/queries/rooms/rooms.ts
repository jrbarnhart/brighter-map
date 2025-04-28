import axios from "axios";
import { axiosClient } from "../axiosClient";
import type { paths } from "@/lib/types/apiTypes";

export async function fetchRooms() {
  try {
    const roomsQuery = await axiosClient.get<
      paths["/rooms"]["get"]["responses"]["200"]["content"]["application/json"]
    >("/rooms");

    return roomsQuery.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      console.error(error);
      throw new Error(
        "An unexpected error occurred while fetching room by id."
      );
    }
  }
}

export async function fetchRoomById({ id }: { id: string | number }) {
  // console.info('Fetching room by id...');
  try {
    const roomQuery = await axiosClient.get<
      paths["/rooms/{id}"]["get"]["responses"]["200"]["content"]["application/json"]
    >(`/rooms/${id.toString()}`);

    return roomQuery.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      console.error(error);
      throw new Error("An unexpected error occurred while fetching rooms.");
    }
  }
}
