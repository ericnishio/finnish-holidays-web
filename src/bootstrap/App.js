import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'

import {Heading, Subheading, Capitalize, Emphasize, Underline} from '../common/components/Typography'
import Button from '../common/components/Button'
import {getNextHoliday, getHolidayAfter, getHolidayBefore, getConsecutiveHolidays} from '../common/helpers'
import {DESKTOP_MIN_WIDTH} from '../common/styles/responsive'
import {FontSize} from '../common/styles/fonts'
import {LIGHT_BLUE} from '../common/styles/colors'
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

    const consecutiveHolidays = getConsecutiveHolidays(holiday)

    const timeUntil = distanceInWordsStrict(
      new Date(),
      new Date(holiday.year, holiday.month - 1, holiday.day),
      {
        addSuffix: true,
        partialMethod: 'ceil',
      }
    )

    const date = format(
      new Date(holiday.year, holiday.month - 1, holiday.day),
      'ddd, MMM D'
    ).toUpperCase()

    return (
      <Board>
        <Center>
          <LogoContainer>
            <Logo src={LOGO} alt="Finnish Holidays" />
          </LogoContainer>
          <Subheading style={{marginBottom: '10px'}}>
            {timeUntil}
          </Subheading>
          <Heading>{holiday.description.replace(`'`, '’')}</Heading>
          <Underline style={{marginTop: '20px'}} />
          {
            <Message>
              {
                consecutiveHolidays.length > 1 &&
                <Fragment>
                  <Emphasize>{consecutiveHolidays.length}</Emphasize>
                  {' '}consecutive days off:{' '}
                  <Emphasize>
                    {consecutiveHolidays.map(_ => format(_.date, 'ddd')).join(', ')}
                  </Emphasize>
                </Fragment>
              }
            </Message>
          }
        </Center>
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

const Logo = styled.img`
  width: 60px; height: auto;

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    width: 80px;
  }
`

const Message = styled.div`
  font-size: ${FontSize.Mobile.SMALL};
  height: 20px;
  margin-top: 30px;

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    font-size: ${FontSize.Desktop.SMALL};
    height: 30px;
    margin-top: 40px;
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
