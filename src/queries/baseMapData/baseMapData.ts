import axios from 'axios'
import { axiosClient } from '../axiosClient'
import type { paths } from '@/lib/types/apiTypes'

export async function fetchBaseMapData() {
  // console.info('Fetching base map data...');
  try {
    const [roomsQuery, vendorsQuery] = await Promise.all([
      axiosClient.get<
        paths['/rooms']['get']['responses']['200']['content']['application/json']
      >('/rooms'),
      axiosClient.get<
        paths['/npcs/vendors']['get']['responses']['200']['content']['application/json']
      >('/npcs/vendors'),
    ])

    return { rooms: roomsQuery.data, vendors: vendorsQuery.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      console.error(error)
      throw new Error(
        'An unexpected error occurred while fetching base map data.',
      )
    }
  }
}

export type BaseMapData = Awaited<ReturnType<typeof fetchBaseMapData>>
