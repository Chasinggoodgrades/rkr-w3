import Columns from '@/components/molecules/columns'
import { Difficulty } from '@/interfaces/difficulty'
import { Player } from '@/interfaces/player'
import { formatComparePlayer } from '@/utils'

interface Props {
  columns: Readonly<Array<{ title: string; key: keyof Player }>>
  loading: boolean
  player: Player
  comparePlayer?: Player
  difficulty?: Difficulty
  variant?: 'primary' | 'secondary'
}

export default function ColumnsWithComparison({
  columns,
  comparePlayer,
  loading,
  player,
  difficulty = undefined,
  variant = 'primary',
}: Props) {
  return (
    <Columns
      loading={loading}
      data={formatComparePlayer(player, comparePlayer, columns, difficulty)}
      variant={variant}
    />
  )
}
