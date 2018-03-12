import React, {Component} from 'react'
import styled from 'styled-components'

import {Heading, Subheading, Capitalize, Underline} from '../common/components/Typography'
import Button from '../common/components/Button'

class App extends Component {
  previous = () => {}

  next = () => {}

  render() {
    return (
      <Board>
        <Center>
          <Subheading style={{marginBottom: '10px'}}>
            in 9 months
          </Subheading>
          <Heading>Independence Day</Heading>
          <Underline style={{marginTop: '40px'}} />
        </Center>
        <Navigation>
          <Button direction="left" onClick={this.previous} />
          <Capitalize style={{marginLeft: '35px', marginRight: '35px'}}>
            Thu, Dec 9
          </Capitalize>
          <Button direction="right" onClick={this.next} />
        </Navigation>
      </Board>
    )
  }
}

const Board = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

const Center = styled.div`
  align-items: center; justify-content: center;
  display: flex;
  flex: 1;
  flex-direction: column;
`

const Navigation = styled.div`
  align-items: center; justify-content: center;
  display: flex;
  height: 150px;
`

export default App
