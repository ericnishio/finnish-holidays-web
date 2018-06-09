import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import Logo from '../common/components/Logo'
import {Heading, P} from '../common/components/Typography'
import {DESKTOP_MIN_WIDTH} from '../common/styles/responsive'

const PrivacyPolicy = () =>
  <Container>
    <Link to="/">
      <Logo />
    </Link>
    <Heading style={{marginBottom: '20px'}}>Privacy Policy</Heading>
    <P>
      Finnish Holidays is a completely static website so we do not store
      any information about our users.
    </P>
    <P>
      Google Analytics uses cookies to collect anonymous data on how
      visitors interact with the website.
    </P>
    <Link to="/">Back to holidays</Link>
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

export default PrivacyPolicy
