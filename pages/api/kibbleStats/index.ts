import { ApiPlayerStats, Kibbles, Player } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSortConditionByKey, fetchData } from '@/utils'

interface QueryParams {
  page?: number
  pageSize?: number
  sortKey?: keyof Kibbles | 'battleTag'
  sortOrder?: 'asc' | 'desc'
}

type StatsRequest = NextApiRequest & { query: QueryParams }

export default async function handler(req: StatsRequest, res: NextApiResponse) {
  try {
    const data = await fetchData('players')

    const formattedData: Player[] = data.map((elem: ApiPlayerStats) => {
      const saveData = JSON.parse(elem['Save Data'])

      const { PlayerName, KibbleCurrency, PersonalBests } = saveData
      const playerStats: Partial<Player> = {}

      playerStats.battleTag = {
        name: PlayerName?.split('#')[0] || '',
        tag: PlayerName || '',
      }

      if (!KibbleCurrency || !PersonalBests) {
        playerStats.kibbles = {
          allTime: 0,
          jackpots: 0,
          superJackpots: 0,
          singleGame: 0,
        }
      } else {
        playerStats.kibbles = {
          allTime: KibbleCurrency?.Collected,
          jackpots: KibbleCurrency?.Jackpots,
          superJackpots: KibbleCurrency.SuperJackpots,
          singleGame: PersonalBests.KibbleCollected,
        }
      }

      return playerStats
    })

    const {
      page = 1,
      sortKey = 'singleGame',
      sortOrder = 'desc',
      pageSize = 15,
    } = req.query

    const totalPages = data ? Math.ceil(data?.length / pageSize) : 0

    const initialIndex = (Number(page) - 1) * pageSize

    const sortedData = formattedData.sort((a, b) => {
      const condition =
        sortKey === 'battleTag'
          ? getSortConditionByKey(sortKey, a, b)
          : a.kibbles[sortKey] > b.kibbles[sortKey]

      if (condition === undefined) return 0
      return sortOrder === 'asc' ? (condition ? 1 : -1) : condition ? -1 : 1
    })

    res.status(200).json({
      stats: sortedData.slice(initialIndex, initialIndex + pageSize),
      pages: totalPages,
    })

    res.status(200).json(formattedData)
  } catch (error) {
    console.error('Error fetching kibble stats data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
