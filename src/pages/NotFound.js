import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import Logo from '../common/components/Logo'
import {Heading} from '../common/components/Typography'
import {DESKTOP_MIN_WIDTH} from '../common/styles/responsive'

const NotFound = () =>
  <Container>
    <Link to="/">
      <Logo />
    </Link>
    <Heading style={{marginBottom: '20px'}}>Page not found</Heading>
    <Link to="/">View holidays</Link>
  </Container>

const Container = styled.div`
  align-items: center; justify-content: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px;

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    padding: 40px;
  }
`

export default NotFound
