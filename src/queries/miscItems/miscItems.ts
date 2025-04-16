import axios from 'axios'
import { axiosClient } from '../axiosClient'
import type { paths } from '@/lib/types/apiTypes'

export async function fetchMiscItems() {
  // console.info('Fetching misc items...');
  try {
    const miscItemsQuery =
      await axiosClient.get<
        paths['/items/misc']['get']['responses']['200']['content']['application/json']
      >('/items/misc')

    return miscItemsQuery.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      console.error(error)
      throw new Error('An unexpected error occurred while fetching misc items.')
    }
  }
}
