import styled from 'styled-components'

export const TABLET_MAX_WIDTH = '767px'
export const TABLET_MIN_WIDTH = '768px'

export const MobileOnly = styled.div`
  @media (min-width: ${TABLET_MIN_WIDTH}) {
    display: none;
  }
`

export const DesktopOnly = styled.div`
  @media (max-width: ${TABLET_MAX_WIDTH}) {
    display: none;
  }
`
