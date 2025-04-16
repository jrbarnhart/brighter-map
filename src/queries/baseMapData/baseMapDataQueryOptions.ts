import { queryOptions } from '@tanstack/react-query'
import queryConfig from '../queryConfig'
import { fetchBaseMapData } from './baseMapData'

export const baseMapDataKey = 'base-map-data'

export const baseMapDataQueryOptions = queryOptions({
  queryKey: [baseMapDataKey],
  staleTime: queryConfig.staleTime,
  queryFn: () => fetchBaseMapData(),
})
