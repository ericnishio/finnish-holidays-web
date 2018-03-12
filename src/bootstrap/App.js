import React, {Component} from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import {Heading, Subheading, Capitalize, Underline} from '../common/components/Typography'
import Button from '../common/components/Button'
import {getNextHoliday, getHolidayAfter, getHolidayBefore} from '../common/helpers'
import LOGO from '../assets/images/logo.png'

class App extends Component {
  state = {
    holiday: getNextHoliday(),
  }

  previous = () =>
    this.setState(prevState => ({
      holiday: getHolidayBefore(prevState.holiday),
    }))

  next = () =>
    this.setState(prevState => ({
      holiday: getHolidayAfter(prevState.holiday),
    }))

  render() {
    const {holiday} = this.state

    const timeUntil = distanceInWordsToNow(
      new Date(holiday.year, holiday.month - 1, holiday.day),
      {addSuffix: true}
    )

    const date = format(
      new Date(holiday.year, holiday.month - 1, holiday.day),
      'ddd, MMM D'
    ).toUpperCase()

    return (
      <Board>
        <Center>
          <Logo src={LOGO} alt="Finnish Holidays" />
          <Subheading style={{marginBottom: '10px'}}>
            {timeUntil}
          </Subheading>
          <Heading>{holiday.description.replace(`'`, '’')}</Heading>
          <Underline style={{marginTop: '40px'}} />
        </Center>
        <Navigation>
          <Button direction="left" onClick={this.previous} />
          <Capitalize
            style={{
              display: 'block',
              minWidth: '160px',
              textAlign: 'center',
            }}
          >
            {date}
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

const Logo = styled.img`
  width: 75px; height: auto;
  margin-bottom: 40px;
`

const Navigation = styled.div`
  align-items: center; justify-content: center;
  display: flex;
  height: 150px;
`

export default App
