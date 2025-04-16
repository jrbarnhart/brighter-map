import { queryOptions } from '@tanstack/react-query'
import queryConfig from '../queryConfig'
import { fetchMonsterVariants } from './monsterVariants'

export const monsterVariantsKey = 'monster-variants'

export const monsterVariantsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [monsterVariantsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchMonsterVariants(),
    enabled,
  })
