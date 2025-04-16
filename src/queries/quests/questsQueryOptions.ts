import { queryOptions } from '@tanstack/react-query'
import queryConfig from '../queryConfig'
import { fetchQuests } from './quests'

export const questsKey = 'quests'

export const questsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [questsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchQuests(),
    enabled,
  })
