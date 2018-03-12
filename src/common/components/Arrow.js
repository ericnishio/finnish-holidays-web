import styled from 'styled-components'

import {BLUE} from '../styles/colors'

export const ArrowLeft = styled.div`
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 14px solid ${BLUE};
  width: 0; height: 0;
`

export const ArrowRight = styled.div`
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 14px solid ${BLUE};
  width: 0; height: 0;
`
