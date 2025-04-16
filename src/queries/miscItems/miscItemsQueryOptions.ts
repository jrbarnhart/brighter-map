import { queryOptions } from '@tanstack/react-query'
import queryConfig from '../queryConfig'
import { fetchMiscItems } from './miscItems'

export const miscItemsKey = 'misc-items'

export const miscItemsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [miscItemsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchMiscItems(),
    enabled,
  })
