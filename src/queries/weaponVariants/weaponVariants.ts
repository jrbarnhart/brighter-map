import axios from 'axios'
import { axiosClient } from '../axiosClient'
import type { paths } from '@/lib/types/apiTypes'

export async function fetchWeaponVariants() {
  // console.info('Fetching weapon variants...');
  try {
    const weaponVariantsQuery = await axiosClient.get<
      paths['/items/weapons/variants']['get']['responses']['200']['content']['application/json']
    >('/items/weapons/variants')

    return weaponVariantsQuery.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      console.error(error)
      throw new Error(
        'An unexpected error occurred while fetching weapon variants.',
      )
    }
  }
}
