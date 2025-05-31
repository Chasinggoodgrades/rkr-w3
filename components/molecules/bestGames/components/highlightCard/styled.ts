import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.background.quaternary};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  padding: 16px;
  text-align: center;
  width: 100%;
`

export const Date = styled.span`
  color: ${({ theme }) => theme.text.secondary};
  font-size: var(--font-size-xs);
`

export const DetailContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 24px;
  justify-content: center;
  padding-left: 20px;
`

export const Name = styled.span`
  background-color: ${({ theme }) => theme.background.highlightPrimary};
  color: ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-xs);
  padding: 10px;
`

export const Row = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  width: 100%;
`

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  gap: 15px;
`
