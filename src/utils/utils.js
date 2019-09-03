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

export function sortBy(state) {
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

export function formatDate (dateStr) {
  // fake the date of today being 2020-01-03 as in the mockup
  // const now = Date.now()
  const now = new Date(2020, 0, 3, 12, 0)
  const date = new Date(dateStr)
  if (now.getFullYear() - date.getFullYear() > 0) {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate().toString().padStart(2, '0')}`
  } else if (now.getTime() - date.getTime() < 86400000 && now.getDate() === date.getDate()) {
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
  } else {
    return `${month[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}`
  }
}
