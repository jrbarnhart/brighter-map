import { queryOptions } from '@tanstack/react-query'
import queryConfig from '../queryConfig'
import { fetchResourceVariants } from './resourceVariants'

export const resourceVariantsKey = 'resource-variants'

export const resourceVariantsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [resourceVariantsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchResourceVariants(),
    enabled,
  })
