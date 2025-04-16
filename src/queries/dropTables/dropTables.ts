import axios from 'axios'
import { axiosClient } from '../axiosClient'
import type { paths } from '@/lib/types/apiTypes'

export async function fetchDropTables() {
  // console.info('Fetching drop data...');
  try {
    const dropTablesQuery = await axiosClient.get<
      paths['/monsters/drop-tables']['get']['responses']['200']['content']['application/json']
    >('/monsters/drop-tables')

    return dropTablesQuery.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      console.error(error)
      throw new Error(
        'An unexpected error occurred while fetching drop tables.',
      )
    }
  }
}
