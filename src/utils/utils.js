export function sortBy (field, order, arr) {
  if (order === 'asc') {
    return arr.sort((a, b) => (a[field].toString()).localeCompare(b[field].toString()))
  } else {
    return arr.sort((a, b) => (b[field].toString()).localeCompare(a[field].toString()))
  }
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
