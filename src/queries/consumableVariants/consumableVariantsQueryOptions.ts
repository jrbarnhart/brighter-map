import { queryOptions } from '@tanstack/react-query'
import queryConfig from '../queryConfig'
import { fetchConsumableVariants } from './consumableVariants'

export const consumableVariantsKey = 'consumable-variants'

export const consumableVariantsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [consumableVariantsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchConsumableVariants(),
    enabled,
  })
