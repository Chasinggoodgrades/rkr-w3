import { ReactNode, useState } from 'react'
import { Body, Container, Header, Title } from './styled'
import { Plus } from '@/components/icons/plus'
import { useTheme } from '@/hooks/useTheme'
import { Minus } from '@/components/icons/minus'

interface CollapsibleProps {
  children?: ReactNode
  title: string
}

export default function Collapsible({ children, title }: CollapsibleProps) {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [theme] = useTheme()

  const iconProps = {
    fill: theme.text.color.primary,
    height: 16,
    width: 16,
  }

  return (
    <Container>
      <Header onClick={() => setIsCollapsed((prev) => !prev)}>
        <Title>{title}</Title>
        {isCollapsed ? <Plus {...iconProps} /> : <Minus {...iconProps} />}
      </Header>
      <Body isCollapsed={isCollapsed} aria-hidden={isCollapsed}>
        {children}
      </Body>
    </Container>
  )
}
