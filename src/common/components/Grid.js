import styled from 'styled-components'

import {DESKTOP_MIN_WIDTH, MOBILE_MAX_WIDTH} from '../styles/responsive'

const GUTTER = '20px'
const GUTTER_MOBILE = '10px'

export const Content = styled.div`
  margin-left: ${GUTTER_MOBILE}; margin-right: ${GUTTER_MOBILE};

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    display: flex;
    flex-grow: 1;
  }

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    margin-left: ${GUTTER}; margin-right: ${GUTTER};
    width: 1200px;
  }
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
