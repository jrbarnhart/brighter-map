import { queryOptions } from '@tanstack/react-query'
import queryConfig from '../queryConfig'
import { fetchArmorVariants } from './armorVariants'

export const armorVariantsKey = 'armor-variants'

export const armorVariantsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [armorVariantsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchArmorVariants(),
    enabled,
  })
