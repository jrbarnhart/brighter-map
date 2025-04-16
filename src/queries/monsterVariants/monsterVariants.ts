import axios from 'axios'
import { axiosClient } from '../axiosClient'
import type { paths } from '@/lib/types/apiTypes'

export async function fetchMonsterVariants() {
  // console.info('Fetching monster variants...');
  try {
    const monsterVariantsQuery =
      await axiosClient.get<
        paths['/monsters/variants']['get']['responses']['200']['content']['application/json']
      >('/monsters/variants')

    return monsterVariantsQuery.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      console.error(error)
      throw new Error(
        'An unexpected error occurred while fetching monster variants.',
      )
    }
  }
}
