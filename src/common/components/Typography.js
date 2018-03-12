import styled from 'styled-components'

import {LARGE_FONT_SIZE, SMALL_FONT_SIZE} from '../styles/fonts'
import {YELLOW, WHITE} from '../styles/colors'

export const Heading = styled.h1`
  font-size: ${LARGE_FONT_SIZE};
  font-weight: normal;
  margin: 0;
`

export const Capitalize = styled.span`
  font-size: ${SMALL_FONT_SIZE};
  font-weight: normal;
  margin: 0;
  text-transform: uppercase;
`

export const Subheading = Capitalize.extend`
  color: ${YELLOW};
`

export const Underline = styled.div`
  width: 170px;
  height: 2px;
  background: ${WHITE};
`
