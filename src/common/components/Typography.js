import styled from 'styled-components'

import {FontSize} from '../styles/fonts'
import {YELLOW, WHITE} from '../styles/colors'
import {DESKTOP_MIN_WIDTH} from '../styles/responsive'

export const Heading = styled.h1`
  font-size: ${FontSize.Mobile.LARGE};
  font-weight: normal;
  margin: 0;

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    font-size: ${FontSize.Desktop.LARGE};
  }
`

export const Capitalize = styled.span`
  font-size: ${FontSize.Mobile.SMALL};
  font-weight: normal;
  margin: 0;
  text-transform: uppercase;

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    font-size: ${FontSize.Desktop.SMALL};
  }
`

export const Subheading = Capitalize.extend`
  color: ${YELLOW};
`

export const Underline = styled.div`
  width: 120px;
  height: 2px;
  background: ${WHITE};

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    width: 170px;
  }
`
