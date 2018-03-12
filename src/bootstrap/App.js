import React, {Component} from 'react'
import styled from 'styled-components'

class App extends Component {
  render() {
    return (
      <Board>
        <Center>
          Independence Day
        </Center>
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
`

export default App
