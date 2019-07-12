function sortBy (field, order, arr) {
  console.log(typeof (arr[0][field]))
  switch (typeof (arr[0][field])) {
    case 'string': {
      if (order === 'asc') {
        return arr.sort()
      } else {
        return arr.sort().reverse()
      }
    }
    case 'number':
      if (order === 'asc') {
        return arr.sort()
      } else {
        return arr.sort().reverse()
      }
  }
}

export default sortBy
