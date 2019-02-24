import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'

import {Heading, Subheading, Capitalize, Emphasize, Underline} from '../common/components/Typography'
import Logo from '../common/components/Logo'
import Button from '../common/components/Button'
import {getNextHoliday, getHolidayAfter, getHolidayBefore, getConsecutiveHolidays} from '../common/helpers'
import FacebookShare from '../common/components/FacebookShare'
import {DESKTOP_MIN_WIDTH} from '../common/styles/responsive'
import {FontSize} from '../common/styles/fonts'

const Holidays = () => {
  const [holiday, setHoliday] = useState(getNextHoliday())

  const previous = () => setHoliday(getHolidayBefore(holiday))

  const next = () => setHoliday(getHolidayAfter(holiday))

  const current = () => setHoliday(getNextHoliday())

  const onKeydown = ({keyCode}) => {
    // Arrow right
    if (keyCode === 39) {
      next()
    }

    // Arrow left
    if (keyCode === 37) {
      previous()
    }

    // Escape
    if (keyCode === 27) {
      current()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)

    return () => {
      document.removeEventListener('keydown', onKeydown)
    }
  }, [])

  const consecutiveHolidays = getConsecutiveHolidays(holiday)

  const now = new Date()
  const date = new Date(holiday.year, holiday.month - 1, holiday.day)

  const isFuture = +date > +now

  const timeUntil = distanceInWordsStrict(
    new Date(),
    date,
    {
      addSuffix: true,
      partialMethod: isFuture ? 'ceil' : 'floor',
    }
  )

  const dateText = format(
    new Date(holiday.year, holiday.month - 1, holiday.day),
    'ddd, MMM D'
  ).toUpperCase()

  return (
    <Board>
      <Center>
        <Logo />
        <Subheading style={{marginBottom: '10px'}}>
          {timeUntil}
        </Subheading>
        <Heading>{holiday.description.replace(`'`, '’')}</Heading>
        <Underline style={{marginTop: '20px'}} />
        {
          <Message>
            {
              consecutiveHolidays.length > 1 &&
              <>
                <Emphasize>{consecutiveHolidays.length}</Emphasize>
                {' '}consecutive days off:{' '}
                <Emphasize>
                  {consecutiveHolidays.map(_ => format(_.date, 'ddd')).join(', ')}
                </Emphasize>
              </>
            }
          </Message>
        }
      </Center>
      <FacebookShare style={{position: 'absolute', top: '15px', right: '15px'}} />
      <Navigation>
        <Button direction="left" onClick={previous} />
        <DateText onClick={current}>
          {dateText}
        </DateText>
        <Button direction="right" onClick={next} />
      </Navigation>
    </Board>
  )
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

const DateText = styled(Capitalize)`
  align-items: center; justify-content: center;
  display: flex;
  height: 50px;
  min-width: 160px;
  text-align: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  user-select: none;

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

export default Holidays
