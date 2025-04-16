import axios from 'axios'
import { axiosClient } from '../axiosClient'
import type { paths } from '@/lib/types/apiTypes'

export async function fetchConsumableVariants() {
  // console.info('Fetching consumable variants...');
  try {
    const consumableVariantsQuery = await axiosClient.get<
      paths['/items/consumables/variants']['get']['responses']['200']['content']['application/json']
    >('/items/consumables/variants')

    return consumableVariantsQuery.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      console.error(error)
      throw new Error(
        'An unexpected error occurred while fetching consumable variants.',
      )
    }
  }
}
