import { queryOptions } from '@tanstack/react-query'
import queryConfig from '../queryConfig'
import { fetchDropTables } from './dropTables'

export const dropTablesKey = 'drop-tables'

export const dropTablesQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [dropTablesKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchDropTables(),
    enabled,
  })
