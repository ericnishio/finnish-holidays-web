import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import format from 'date-fns/format'
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

    holiday = holidays.find((h) => h.day === appDate.day)

    if (!holiday) {
      date = addOrSubDays(date, 1)
    }
  }

  return holiday
}

export const createDate = (date = new Date()) =>
  ({
    year: Number(format(date, 'YYYY')),
    month: Number(format(date, 'M')),
    day: Number(format(date, 'D')),
  })
