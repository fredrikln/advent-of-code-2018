const fs = require('fs')

let input = fs.readFileSync('./input.txt', 'utf8')

// input = `Step C must be finished before step A can begin.
// Step C must be finished before step F can begin.
// Step A must be finished before step B can begin.
// Step A must be finished before step D can begin.
// Step B must be finished before step E can begin.
// Step D must be finished before step E can begin.
// Step F must be finished before step E can begin.`

input = input.trim().split('\n').map(i => {
  const line = i.split(' ')

  return {
    requirement: line[1],
    step: line[7]
  }
})

const instructions = input.reduce((acc, step) => {
  if (!acc[step.step]) acc[step.step] = {requirement: [], before: [], used: false}
  if (!acc[step.requirement]) acc[step.requirement] = {requirement: [], before: [], used: false}

  acc[step.step].requirement.push(step.requirement)
  acc[step.step].requirement = acc[step.step].requirement.sort()

  acc[step.requirement].before.push(step.step)
  acc[step.requirement].before = acc[step.requirement].before.sort()

  return acc
}, {})

const first = Object.keys(instructions).find(i => instructions[i].requirement.length === 0)

let string = first

const getAvailable = (string) => {
  return Object.keys(instructions).filter(key => {
    return string.indexOf(key) === -1 && instructions[key].requirement.filter(r => string.indexOf(r) === -1).length == 0
  }).sort().reverse()
}

let added = false
do {
  added = false

  const available = getAvailable(string).pop()
  if (available) {
    string += available
    added = true
  }
} while (added)

console.log(instructions, first, string)
