import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import subMonths from 'date-fns/sub_months'
import addMonths from 'date-fns/add_months'
import format from 'date-fns/format'
import isWeekend from 'date-fns/is_weekend'
import finnishholidays from 'finnish-holidays-js'

export const getNextHoliday = (date = new Date()) =>
  getHolidayWithNewDate(addDays, date)

export const getPreviousHoliday = (date = new Date()) =>
  getHolidayWithNewDate(subDays, date)

export const getHolidayAfter = ({year, month, day}) => {
  const nextDate = addDays(new Date(year, month - 1, day), 1)

  return getNextHoliday(nextDate)
}

export const getHolidayBefore = ({year, month, day}) => {
  const previousDate = subDays(new Date(year, month - 1, day), 1)

  return getPreviousHoliday(previousDate)
}

const getHolidayWithNewDate = (addOrSubDays, date = new Date()) => {
  let holiday = undefined

  while (!holiday) {
    const appDate = createDate(date)
    const holidays = finnishholidays.month(appDate.month, appDate.year) || []

    holiday = holidays.find(_ => _.day === appDate.day)

    if (!holiday) {
      date = addOrSubDays(date, 1)
    }
  }

  return holiday
}

export const getConsecutiveHolidays = (holiday) => {
  const dateOfHoliday = new Date(holiday.year, holiday.month - 1, holiday.day)

  const holidaysBefore = findConsecutiveHolidaysSince({sinceDate: dateOfHoliday, forward: false})
  const holidaysAfter = findConsecutiveHolidaysSince({sinceDate: dateOfHoliday, forward: true})

  return [
    ...holidaysBefore,
    {
      // Include current holiday by default
      type: 'holiday',
      date: dateOfHoliday,
      holiday,
    },
    ...holidaysAfter,
  ].sort((a, b) => a.date > b.date)
}

// This algorithm keeps collecting holidays and weekends
// until it comes across a non-holiday weekday.
const findConsecutiveHolidaysSince = ({sinceDate, forward = true, weekends = true}) => {
  const consecutiveHolidays = []

  const dateNextMonth = forward ? addMonths(sinceDate, 1) : subMonths(sinceDate, 1)
  const availableHolidays = [
    ...finnishholidays.month(sinceDate.getMonth() + 1, sinceDate.getFullYear()),
    ...finnishholidays.month(dateNextMonth.getMonth() + 1, dateNextMonth.getFullYear()),
  ]

  let isDone = false
  let nextDay = new Date(sinceDate)

  while (!isDone) {
    nextDay = forward ? addDays(nextDay, 1) : subDays(nextDay, 1)

    const date = {
      year: nextDay.getFullYear(),
      month: nextDay.getMonth() + 1,
      day: nextDay.getDate(),
    }

    const correspondingHoliday = availableHolidays.find(
      _ => _.year === date.year && _.month === date.month && _.day === date.day
    )

    if (correspondingHoliday) {
      consecutiveHolidays.push({
        type: 'holiday',
        date: new Date(nextDay),
        holiday: correspondingHoliday,
      })
    } else if (weekends && isWeekend(nextDay)) {
      consecutiveHolidays.push({
        type: 'weekend',
        date: new Date(nextDay),
      })
    } else {
      isDone = true
    }
  }

  return consecutiveHolidays.sort(
    (a, b) => (+a.date) - (+b.date) // sort by date
  )
}

export const createDate = (date = new Date()) =>
  ({
    year: Number(format(date, 'YYYY')),
    month: Number(format(date, 'M')),
    day: Number(format(date, 'D')),
  })
