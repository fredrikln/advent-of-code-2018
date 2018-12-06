const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8').trim()

// const input = 'dabAcCaCBAcCcaDA'

const pairs = 'abcdefghijklmnopqrstuvwxyz'.split('').reduce((acc, letter) => {
  acc.push(letter + letter.toUpperCase())
  acc.push(letter.toUpperCase() + letter)

  return acc
}, [])

function react (input) {
  let oldInput
  do {
    oldInput = input

    for (var i = 0; i < pairs.length; i++) {
      input = input.replace(pairs[i], '')
    }
  } while (oldInput !== input)

  return input
}

function react2 (input) {
  let shortest = input.length
  for (var i = 0; i < pairs.length; i += 2) {
    const pair = pairs[i]

    const inputWithout = input.replace(RegExp(`[${pair}]`, 'g'), '')

    const reacted = react(inputWithout)

    if (reacted.length < shortest) shortest = reacted.length
  }

  return shortest
}

console.log(react(input).length)
console.log(react2(input))
