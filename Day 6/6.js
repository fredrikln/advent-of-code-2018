const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8').trim().split('\n').map(c => c.split(', ')).map(c => ({
  x: parseInt(c[0]),
  y: parseInt(c[1])
}))

const minMax = input.reduce((acc, coord) => {
  if (coord.x < acc.minX) acc.minX = coord.x
  if (coord.x > acc.maxX) acc.maxX = coord.x
  if (coord.y < acc.minY) acc.minY = coord.y
  if (coord.y > acc.maxY) acc.maxY = coord.y

  return acc
}, {
  minX: 9999,
  maxX: -9999,
  minY: 9999,
  maxY: -9999
})

const manhattanDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y)

const minX = minMax.minX - 1
const maxX = minMax.maxX + 1
const minY = minMax.minY - 1
const maxY = minMax.maxY + 1

let map = []
for (let i = minX; i < maxX; i++) {
  for (let j = minY; j < maxY; j++) {
    let minDistance = 9999
    let distances = {}

    for (let k = 0; k < input.length; k++) {
      let distance = manhattanDistance({x: i, y: j}, input[k])
      distances[k] = distance

      if (distance < minDistance) {
        minDistance = distance
      }
    }

    const minDistances = Object.keys(distances).filter(d => distances[d] === minDistance)
    if (minDistances.length > 1) {
      map[i + j * (maxX - minX)] = null
    } else {
      map[i + j * (maxX - minX)] = Object.keys(distances).find(d => distances[d] === minDistance)
    }
  }
}

const bannedValues = []
// filter X
for (let i = minX; i < maxX; i++) {
  const value = map[i + minY * (maxX - minX)]
  if (value && bannedValues.indexOf(value) === -1) {
    bannedValues.push(value)
  }
}
for (let i = minX; i < maxX; i++) {
  const value = map[i + (maxY - 1) * (maxX - minX)]
  if (value && bannedValues.indexOf(value) === -1) {
    bannedValues.push(value)
  }
}

// filter Y
for (let i = minY; i < maxY; i++) {
  const value = map[minX + i * (maxX - minX)]
  if (value && bannedValues.indexOf(value) === -1) {
    bannedValues.push(value)
  }
}
for (let i = minX; i < maxX; i++) {
  const value = map[(maxX - 1) + i * (maxX - minX)]
  if (value && bannedValues.indexOf(value) === -1) {
    bannedValues.push(value)
  }
}

map = map.map(c => bannedValues.indexOf(c) === -1 ? c : '  ')

let file = ''
for (let i = minX; i < maxX; i++) {
  for (let j = minY; j < maxY; j++) {
    const value = map[i + j * (maxX - minX)]

    if (!value) {
      file += '  '
    } else {
      file += value.padStart(2, ' ')
    }
  }
  file += '\n'
}

fs.writeFileSync('output.txt', file)
// map.filter()

const counts = map.reduce((acc, v) => {
  if (!acc[v]) acc[v] = 0

  acc[v]++

  return acc
}, {})

console.log(counts)

map = []
for (let i = minX; i < maxX; i++) {
  for (let j = minY; j < maxY; j++) {
    for (let k = 0; k < input.length; k++) {
      let distance = manhattanDistance({x: i, y: j}, input[k])

      if (!map[i + j * (maxX - minX)]) map[i + j * (maxX - minX)] = 0

      map[i + j * (maxX - minX)] += distance
    }

    if (map[i + j * (maxX - minX)] >= 10000) map[i + j * (maxX - minX)] = null
  }
}

file = ''
for (let i = minX; i < maxX; i++) {
  for (let j = minY; j < maxY; j++) {
    const value = map[i + j * (maxX - minX)]

    if (!value) {
      file += ' '
    } else {
      file += 'X'
    }
  }
  file += '\n'
}

fs.writeFileSync('output2.txt', file)

map = map.filter(c => !!c)

console.log(map.length)
