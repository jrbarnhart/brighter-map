import axios from 'axios'
import { axiosClient } from '../axiosClient'
import type { paths } from '@/lib/types/apiTypes'

export async function fetchQuests() {
  // console.info('Fetching quests...');
  try {
    const questsQuery =
      await axiosClient.get<
        paths['/quests']['get']['responses']['200']['content']['application/json']
      >('/quests')

    return questsQuery.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      console.error(error)
      throw new Error('An unexpected error occurred while fetching quests.')
    }
  }
}
