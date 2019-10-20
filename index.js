// You need to have your shit ready to go by November 13th, 2019. Get to work!

const deadline = new Date(2019, 10, 13, 0, 0, 0)
const MILLISECONDS_IN_A_SECOND = 1000
const MILLISECONDS_IN_A_MINUTE = MILLISECONDS_IN_A_SECOND * 60
const MILLISECONDS_IN_AN_HOUR = MILLISECONDS_IN_A_MINUTE * 60
const MILLISECONDS_IN_A_DAY = MILLISECONDS_IN_AN_HOUR * 24

const timeLeftTilDeadline = () => deadline - new Date()

const inflect = (singular, plural) => number =>
  number !== 1 ? plural : singular
const inflectDays = inflect('day', 'days')
const inflectHours = inflect('hour', 'hours')
const inflectMinutes = inflect('minute', 'minutes')
const inflectSeconds = inflect('second', 'seconds')

const createInnerText = inflection => number =>
  `${number} ${inflection(number)}`
const createInnerTextForDays = createInnerText(inflectDays)
const createInnerTextForHours = createInnerText(inflectHours)
const createInnerTextForMinutes = createInnerText(inflectMinutes)
const createInnerTextForSeconds = createInnerText(inflectSeconds)

const daysElement = document.querySelector('.days')
const hoursElement = document.querySelector('.hours')
const minutesElement = document.querySelector('.minutes')
const secondsElement = document.querySelector('.seconds')

const add = (x, y) => x + y
const subtract = (x, y) => x - y

const updateDOM = () => {
  let timeLeft = timeLeftTilDeadline()
  const isPastDeadline = timeLeft < 0
  const operator = isPastDeadline ? add : subtract
  const roundingMethod = isPastDeadline ? 'ceil' : 'floor'

  const daysLeft = Math[roundingMethod](timeLeft / MILLISECONDS_IN_A_DAY)
  timeLeft = operator(timeLeft, Math.abs(daysLeft * MILLISECONDS_IN_A_DAY))

  const hoursLeft = Math[roundingMethod](timeLeft / MILLISECONDS_IN_AN_HOUR)
  timeLeft = operator(timeLeft, Math.abs(hoursLeft * MILLISECONDS_IN_AN_HOUR))

  const minutesLeft = Math[roundingMethod](timeLeft / MILLISECONDS_IN_A_MINUTE)
  timeLeft = operator(
    timeLeft,
    Math.abs(minutesLeft * MILLISECONDS_IN_A_MINUTE)
  )

  const secondsLeft = Math[roundingMethod](timeLeft / MILLISECONDS_IN_A_SECOND)

  daysElement.innerText = createInnerTextForDays(daysLeft)
  hoursElement.innerText = createInnerTextForHours(hoursLeft)
  minutesElement.innerText = createInnerTextForMinutes(minutesLeft)
  secondsElement.innerText = createInnerTextForSeconds(secondsLeft)
}

updateDOM()
setInterval(updateDOM, MILLISECONDS_IN_A_SECOND)
