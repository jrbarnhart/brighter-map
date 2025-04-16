import axios from 'axios'
import { axiosClient } from '../axiosClient'
import type { paths } from '@/lib/types/apiTypes'

export async function fetchArmorVariants() {
  // console.info('Fetching armor variants...');
  try {
    const armorVariantsQuery = await axiosClient.get<
      paths['/items/armors/variants']['get']['responses']['200']['content']['application/json']
    >('/items/armors/variants')

    return armorVariantsQuery.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      console.error(error)
      throw new Error(
        'An unexpected error occurred while fetching armor variants.',
      )
    }
  }
}
