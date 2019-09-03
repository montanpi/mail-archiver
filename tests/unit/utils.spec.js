import { compareBy, sortBy, formatAsDayMonth, formatAsTime, formatAsYear, differentYearFrom, sameDayAs, formatDate } from '../../src/utils/utils'
import * as R from 'ramda'

const emails = [{ 'id': 10, 'from': 'aaa@example.com', 'to': ['zzz.zzz@example.com'], 'subject': '[ HR-888 ] Notice of official announcement', 'body': 'Body of email with id 10.', 'attachment': false, 'date': '2020-01-02T15:20:00.000Z' }, { 'id': 9, 'from': 'bbb.bbbb@example.com', 'to': ['yyy@example.com'], 'subject': '[web:333] "Web Contact"', 'body': 'Body of email with id 9. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'attachment': false, 'date': '2020-01-02T15:10:00.000Z' }, { 'id': 8, 'from': 'ccc.@example.com', 'to': ['xxx@example.com', 'www.www@example.com'], 'subject': 'Happy New Year! Greetings for the New Year.', 'body': 'Body of email with id 8. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et est ac risus tincidunt tristique in nec massa.', 'attachment': true, 'date': '2020-01-02T15:00:00.000Z' }, { 'id': 7, 'from': 'ddd.dddd@example.com', 'to': ['vvv.vvv@example.com', 'uuu@example.com', 'ttt@example.com'], 'subject': '[ HR-888 ] Notice of official announcement', 'body': 'Body of email with id 7. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et est ac risus tincidunt tristique in nec massa. Mauris justo erat, vulputate ac pretium eu, rhoncus ut est.', 'attachment': false, 'date': '2020-01-01T09:04:00.000Z' }, { 'id': 6, 'from': 'eee@example.com', 'to': ['sss@example.com', 'rrr@example.com', 'qqq@example.com', 'ppp@example.com'], 'subject': '[HR-887(Revised: Office Expansion Project Team)] Notice of official announcement', 'body': 'Body of email with id 6. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et est ac risus tincidunt tristique in nec massa. Mauris justo erat, vulputate ac pretium eu, rhoncus ut est. In vel semper arcu.', 'attachment': false, 'date': '2020-01-01T09:03:00.000Z' }, { 'id': 5, 'from': 'fff.ffff@example.com', 'to': ['qqq.qqq@example.com'], 'subject': '[dev] Postfix 3.1.12 / 3.2.9 / 3.3.4 / 3.4.5', 'body': 'Body of email with id 5. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et est ac risus tincidunt tristique in nec massa. Mauris justo erat, vulputate ac pretium eu, rhoncus ut est. In vel semper arcu. Integer sit amet convallis velit, sed egestas ex.', 'attachment': false, 'date': '2020-01-01T09:02:00.000Z' }, { 'id': 4, 'from': 'ggg@example.com', 'to': ['ppp@example.com'], 'subject': 'Re: [Github] Brush-up on loading animation', 'body': 'Body of email with id 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et est ac risus tincidunt tristique in nec massa. Mauris justo erat, vulputate ac pretium eu, rhoncus ut est. In vel semper arcu. Integer sit amet convallis velit, sed egestas ex. Morbi tempor libero vel vehicula consequat.', 'attachment': false, 'date': '2020-01-01T09:01:00.000Z' }, { 'id': 3, 'from': 'hhh.hhh@example.com', 'to': ['ooo.ooo@example.com'], 'subject': 'Workplace Summary for sample, Inc.: Jun 2 - Jun 9', 'body': 'Body of email with id 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et est ac risus tincidunt tristique in nec massa. Mauris justo erat, vulputate ac pretium eu, rhoncus ut est. In vel semper arcu. Integer sit amet convallis velit, sed egestas ex. Morbi tempor libero vel vehicula consequat. Vivamus dapibus consectetur nulla, sed maximus dolor consectetur at.', 'attachment': true, 'date': '2020-01-01T09:00:00.000Z' }, { 'id': 2, 'from': 'iii@example.com', 'to': ['nnn@example.com'], 'subject': 'I love you', 'body': 'Body of email with id 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et est ac risus tincidunt tristique in nec massa. Mauris justo erat, vulputate ac pretium eu, rhoncus ut est. In vel semper arcu. Integer sit amet convallis velit, sed egestas ex. Morbi tempor libero vel vehicula consequat. Vivamus dapibus consectetur nulla, sed maximus dolor consectetur at. Curabitur et faucibus ligula.', 'attachment': true, 'date': '2019-12-31T09:01:00.000Z' }, { 'id': 1, 'from': 'Pablo-Diego-José-Francisco', 'to': ['Pablo-Diego-José-Francisco'], 'subject': '[info:888] ABC EQUIPMENT COMPANY', 'body': 'Body of email with id 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et est ac risus tincidunt tristique in nec massa. Mauris justo erat, vulputate ac pretium eu, rhoncus ut est. In vel semper arcu. Integer sit amet convallis velit, sed egestas ex. Morbi tempor libero vel vehicula consequat. Vivamus dapibus consectetur nulla, sed maximus dolor consectetur at. Curabitur et faucibus ligula. Pellentesque lectus neque, porta vitae metus sed, vestibulum ultrices quam. Aliquam erat volutpat. Vestibulum dolor orci, fermentum vel tincidunt lobortis, malesuada non tellus. In et quam consequat, facilisis sapien ac, sagittis dui. Mauris venenatis nunc augue, vel aliquet orci aliquet eget. Sed accumsan volutpat urna ut consectetur. Vestibulum metus felis, tristique nec fermentum vel, efficitur quis enim. Quisque non semper ex. Sed aliquet lectus elit, eu tempor arcu interdum sit amet.', 'attachment': false, 'date': '2019-12-31T09:00:00.000Z' }]

describe('compareBy', () => {
  it('sort mixed lower and upper case strings', () => {
    expect(R.ascend(compareBy.from, { from: 'aaa@example.com' }, { from: 'bbb.bbbb@example.com' })).toBe(-1)
    expect(R.ascend(compareBy.from, { from: 'bbb.bbbb@example.com' }, { from: 'aaa@example.com' })).toBe(1)
    expect(R.ascend(compareBy.from, { from: 'aaa@example.com' }, { from: 'aaa@example.com' })).toBe(0)
    expect(R.ascend(compareBy.from, { from: 'Pablo-Diego-José-Francisco' }, { from: 'ppp@example.com' })).toBe(-1)
    expect(R.ascend(compareBy.from, { from: 'ppp@example.com' }, { from: 'Pablo-Diego-José-Francisco' })).toBe(1)
    expect(R.ascend(compareBy.from, { from: 'Pablo-Diego-José-Francisco' }, { from: 'Pablo-Diego-José-Francisco' })).toBe(0)
  })
  it('sort recipients based on first element of the array', () => {
    expect(R.ascend(compareBy.to, { to: ['Pablo-Diego-José-Francisco'] }, { to: ['ppp@example.com'] })).toBe(-1)
    expect(R.ascend(compareBy.to, { to: ['ppp@example.com'] }, { to: ['Pablo-Diego-José-Francisco'] })).toBe(1)
    expect(R.ascend(compareBy.to, { to: ['Pablo-Diego-José-Francisco'] }, { to: ['Pablo-Diego-José-Francisco'] })).toBe(0)
  })
  it('sort dates', () => {
    expect(R.ascend(compareBy.date, { date: '2020-01-02T15:10:00.000Z' }, { date: '2020-01-02T15:20:00.000Z' })).toBe(-1)
    expect(R.ascend(compareBy.date, { date: '2020-01-02T15:20:00.000Z' }, { date: '2020-01-02T15:10:00.000Z' })).toBe(1)
    expect(R.ascend(compareBy.date, { date: '2020-01-02T15:10:00.000Z' }, { date: '2020-01-02T15:10:00.000Z' })).toBe(0)
  })
})

describe('sortBy', () => {
  it('sort emails by "from"', () => {
    expect(R.pipe(
      sortBy,
      R.map(R.prop('id'))
    )({ sort: 'from', order: 'desc', emails })).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(sortBy({ sort: 'from', order: 'asc', emails }).map(cur => cur.id)).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
  })
  it('sort emails by "to"', () => {
    expect(sortBy({ sort: 'to', order: 'desc', emails }).map(cur => cur.id)).toEqual([10, 9, 8, 7, 6, 5, 4, 1, 3, 2])
    expect(sortBy({ sort: 'to', order: 'asc', emails }).map(cur => cur.id)).toEqual([2, 3, 1, 4, 5, 6, 7, 8, 9, 10])
  })
  it('sort emails by "subject"', () => {
    expect(sortBy({ sort: 'subject', order: 'desc', emails }).map(cur => cur.id)).toEqual([3, 4, 2, 8, 9, 1, 6, 5, 10, 7])
    expect(sortBy({ sort: 'subject', order: 'asc', emails }).map(cur => cur.id)).toEqual([10, 7, 5, 6, 1, 9, 8, 2, 4, 3])
  })
  it('sort emails by "dates"', () => {
    expect(sortBy({ sort: 'date', order: 'desc', emails }).map(cur => cur.id)).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
    expect(sortBy({ sort: 'date', order: 'asc', emails }).map(cur => cur.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })
})

describe('formatAsYear', () => {
  it('format date in yyyy/mm/dd', () => {
    expect(formatAsYear(new Date('2019-12-31T09:00:00.000Z'))).toEqual('2019/12/31')
  })
})

describe('formatAsDayMonth', () => {
  it('format date in mmm dd', () => {
    expect(formatAsDayMonth(new Date('2020-01-01T09:00:00.000Z'))).toEqual('Jan 01')
    expect(formatAsDayMonth(new Date('2020-10-31T09:00:00.000Z'))).toEqual('Oct 31')
  })
})

describe('formatAsTime', () => {
  it('format date in (h)h:mm', () => {
    expect(formatAsTime(new Date('2020-01-02T15:20:00.000Z'))).toEqual('0:20')
    expect(formatAsTime(new Date('2020-01-02T12:31:00.000Z'))).toEqual('21:31')
  })
})

describe('differentYearFrom', () => {
  it('return true if two dates are in different years', () => {
    expect(differentYearFrom(new Date('2020-01-01T09:04:00.000Z'))(new Date('2019-01-01T09:04:00.000Z'))).toBe(true)
    expect(differentYearFrom(new Date('2019-01-01T09:04:00.000Z'))(new Date('2020-01-01T09:04:00.000Z'))).toBe(true)
    expect(differentYearFrom(new Date(2020, 0, 3, 12, 0))(new Date('2020-01-02T15:20:00.000Z'))).toBe(false)
  })
})

describe('sameDayAs', () => {
  it('return true if two dates are in the same day', () => {
    expect(sameDayAs(new Date(2020, 0, 3, 12, 0))(new Date('2020-01-02T15:20:00.000Z'))).toBe(true)
    expect(sameDayAs(new Date(2020, 0, 3, 12, 0))(new Date('2020-01-01T09:04:00.000Z'))).toBe(false)
  })
})

describe('formatDate', () => {
  it('format input date as Year, DayMonth or Time format', () => {
    expect(formatDate(new Date('2019-12-31T09:00:00.000Z'))).toEqual('2019/12/31')
    expect(formatDate(new Date('2020-01-01T09:00:00.000Z'))).toEqual('Jan 01')
    expect(formatDate(new Date('2020-01-02T15:20:00.000Z'))).toEqual('0:20')
  })
})
