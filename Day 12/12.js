const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8').split('\n\n')

const stateDescription = input[0].split(': ')[1]

const instructions = input[1].trim().split('\n').map(i => {
  const input = i.split(' => ')

  return { input: input[0], output: input[1] }
}).filter(i => i.output === '#').reduce((acc, i) => {
  acc[i.input] = i.output === '#'

  return acc
}, {})

// console.log(instructions)

const createNode = (val, on = false, prev, next) => ({ val: val, on: on, l: prev, r: next })

const createNodes = (stateDescription, initial = createNode()) => {
  let current = initial

  for (let i = 0; i < stateDescription.length; i++) {
    if (stateDescription[i] === '#') {
      current.on = true
    } else {
      current.on = false
    }
    current.r = createNode(current.val + 1, false, current)
    current = current.r
  }
  current.r = createNode(current.val + 1, false, current)
  return initial
}

const printState = (state, withVal = false) => {
  let current = state
  let string = ''

  while (current) {
    if (current.on) {
      string += `${withVal ? current.val + ': ' : ''}#`
    } else {
      string += `${withVal ? current.val + ': ' : ''}.`
    }
    current = current.r
  }

  return string.replace(/^\.+/g, '..')
}

const createRoot = (start = 0) => {
  const state = createNode(start - 2)
  state.r = createNode(start - 1, false, state)
  state.r.r = createNode(start, false, state.r)

  return state
}

const root = createRoot()
createNodes(stateDescription, root.r.r)
console.log(printState(root))

const get2L = node => {
  if (!node.l) return '.'
  if (!node.l.l) return '.'
  return node.l.l.on ? '#' : '.'
}
const getL = node => {
  if (!node.l) return '.'
  return node.l.on ? '#' : '.'
}
const getCurrent = node => {
  return node.on ? '#' : '.'
}
const getR = node => {
  if (!node.r) return '.'
  return node.r.on ? '#' : '.'
}
const get2R = node => {
  if (!node.r) return '.'
  if (!node.r.r) return '.'
  return node.r.r.on ? '#' : '.'
}

const evolve = (state, rounds = 1) => {
  let root
  for (let i = 0; i < rounds; i++) {
    // if (i % 1000 === 0) console.log(i)
    root = createRoot(state.val)

    let pointer = root.r.r
    let current = state

    while (current) {
      const key = [get2L, getL, getCurrent, getR, get2R].map(f => f(current)).join('')

      if (instructions[key]) pointer.on = true
      pointer.r = createNode(current.val + 1, false, pointer)

      current = current.r
      pointer = pointer.r
    }

    state = root
    console.log(i, printState(root))
    console.log(countFlowers(root))
  }

  return root
}

const countFlowers = root => {
  let current = root
  let counter = 0
  while (current) {
    if (current.on) counter += current.val

    current = current.r
  }

  return counter
}

const newRoot = evolve(root, 200)
const newRoot2 = evolve(root, 201)
// const newRoot3 = evolve(root, 1000)
// console.log(printState(newRoot))
// console.log(countFlowers(newRoot))
const val1 = countFlowers(newRoot)
const val2 = countFlowers(newRoot2)
// const val3 = countFlowers(newRoot3)
const diff = val2 - val1

const fiftybillion = val1 + ((50000000000 - 200) * diff)

console.log(fiftybillion)

// const fiftybil =
