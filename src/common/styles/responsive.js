import styled from 'styled-components'

export const MOBILE_MAX_WIDTH = '767px'
export const DESKTOP_MIN_WIDTH = '768px'

export const MobileOnly = styled.div`
  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    display: none;
  }
`

export const DesktopOnly = styled.div`
  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    display: none;
  }
`
