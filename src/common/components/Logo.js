import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {DESKTOP_MIN_WIDTH} from '../styles/responsive'
import {LIGHT_BLUE} from '../styles/colors'
import LOGO from '../../assets/images/logo.png'

const Logo = ({style}) =>
  <LogoContainer style={style}>
    <Image src={LOGO} alt="Finnish Holidays" />
  </LogoContainer>

Logo.propTypes = {
  style: PropTypes.any,
}

const LogoContainer = styled.div`
  align-items: center; justify-content: center;
  background-color: ${LIGHT_BLUE};
  border-radius: 50%;
  box-shadow: 0 0 30px 0 #374A79;
  display: flex;
  margin-bottom: 35px;
  width: 70px; height: 70px;

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    width: 90px; height: 90px;
  }
`

const Image = styled.img`
  width: 60px; height: auto;

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    width: 80px;
  }
`

export default Logo
