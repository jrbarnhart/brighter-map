import { queryOptions } from '@tanstack/react-query'
import queryConfig from '../queryConfig'
import { fetchWeaponVariants } from './weaponVariants'

export const weaponVariantsKey = 'weapon-variants'

export const weaponVariantsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [weaponVariantsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchWeaponVariants(),
    enabled,
  })
