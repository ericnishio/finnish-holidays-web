import React, {Component} from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import {Heading, Subheading, Capitalize, Underline} from '../common/components/Typography'
import Button from '../common/components/Button'
import {getNextHoliday, getHolidayAfter, getHolidayBefore} from '../common/helpers'
import {DESKTOP_MIN_WIDTH} from '../common/styles/responsive'
import FacebookShare from '../common/components/FacebookShare'
import LOGO from '../assets/images/logo.png'

class App extends Component {
  state = {
    holiday: getNextHoliday(),
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown)
  }

  onKeydown = ({keyCode}) => {
    // Arrow right
    if (keyCode === 39) {
      this.next()
    }

    // Arrow left
    if (keyCode === 37) {
      this.previous()
    }

    // Escape
    if (keyCode === 27) {
      this.current()
    }
  }

  previous = () => this.setState(prevState => ({
    holiday: getHolidayBefore(prevState.holiday),
  }))

  next = () => this.setState(prevState => ({
    holiday: getHolidayAfter(prevState.holiday),
  }))

  current = () => this.setState({
    holiday: getNextHoliday(),
  })

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
        <FacebookShare style={{position: 'absolute', top: 15, right: 15}} />
        <Navigation>
          <Button direction="left" onClick={this.previous} />
          <DateText onClick={this.current}>
            {date}
          </DateText>
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
  width: 110px; height: auto;
  margin-bottom: 35px;

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    width: 130px;
  }
`

const Navigation = styled.div`
  align-items: center; justify-content: center;
  display: flex;
  height: 150px;
`

const DateText = Capitalize.extend`
  align-items: center; justify-content: center;
  display: flex;
  height: 50px;
  min-width: 160px;
  text-align: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover {
    cursor: pointer;
  }

  &:active {
    opacity: 0.6;
  }

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    min-width: 200px;
  }
`

export default App
