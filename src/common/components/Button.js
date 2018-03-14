import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {WHITE} from '../styles/colors'
import {ArrowLeft, ArrowRight} from './Arrow'

const Button = ({direction, onClick, style}) =>
  <Circle onClick={onClick} style={style}>
    <Arrow direction={direction} />
  </Circle>

const DirectionProp = PropTypes.oneOf(['left', 'right'])

Button.propTypes = {
  direction: DirectionProp.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
}

const Arrow = ({direction, style}) => {
  if (direction === 'left') {
    return <ArrowLeft style={{marginRight: '3px', ...style}} />
  }

  if (direction === 'right') {
    return <ArrowRight style={{marginLeft: '6px', ...style}}/>
  }

  return null
}

Arrow.propTypes = {
  direction: DirectionProp.isRequired,
  style: PropTypes.object,
}

const Circle = styled.div`
  align-items: center; justify-content: center;
  background-color: ${WHITE};
  border-radius: 50%;
  display: flex;
  width: 50px; height: 50px;
  opacity: 1;
  transition: opacity 0.1s linear;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover {
    cursor: pointer;
  }

  &:active {
    opacity: 0.6;
  }
`

export default Button
