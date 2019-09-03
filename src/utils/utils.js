import * as R from 'ramda'

export const compareBy = {
  from: R.pipe(R.prop('from'), R.toLower),
  to: R.pipe(
    R.prop('to'),
    R.head,
    R.toLower),
  subject: R.pipe(R.prop('subject'), R.toLower),
  date: R.prop('date')
}

export function sortBy (state) {
  const { sort, order, emails } = state
  return R.equals(order, 'asc')
    ? R.sortWith([
      R.ascend(compareBy[sort]),
      R.descend(compareBy.date)
    ], emails)
    : R.sortWith([
      R.descend(compareBy[sort]),
      R.descend(compareBy.date)
    ], emails)
}

const month = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec'
}

const fullYear = date => date.getFullYear()
const getTime = date => date.getTime()
const getDate = date => date.getDate()

export const formatAsYear = date => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate().toString().padStart(2, '0')}`
export const formatAsDayMonth = date => `${month[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}`
export const formatAsTime = date => `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`

export const differentYearFrom = now => date => R.gt(Math.abs(R.subtract(fullYear(now), fullYear(date))), 0)

export const sameDayAs = now => date => R.and(R.lt(R.subtract(getTime(now), getTime(date)), 86400000), R.equals(getDate(now), getDate(date)))

export function formatDate (dateStr) {
  const now = new Date(2020, 0, 3, 12, 0)
  const date = new Date(dateStr)
  return R.ifElse(
    differentYearFrom(now),
    formatAsYear,
    R.ifElse(
      sameDayAs(now),
      formatAsTime,
      formatAsDayMonth
    )
  )(date)
}
