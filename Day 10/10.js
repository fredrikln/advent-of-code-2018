const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n')

// const input = `position=< 9,  1> velocity=< 0,  2>
// position=< 7,  0> velocity=<-1,  0>
// position=< 3, -2> velocity=<-1,  1>
// position=< 6, 10> velocity=<-2, -1>
// position=< 2, -4> velocity=< 2,  2>
// position=<-6, 10> velocity=< 2, -2>
// position=< 1,  8> velocity=< 1, -1>
// position=< 1,  7> velocity=< 1,  0>
// position=<-3, 11> velocity=< 1, -2>
// position=< 7,  6> velocity=<-1, -1>
// position=<-2,  3> velocity=< 1,  0>
// position=<-4,  3> velocity=< 2,  0>
// position=<10, -3> velocity=<-1,  1>
// position=< 5, 11> velocity=< 1, -2>
// position=< 4,  7> velocity=< 0, -1>
// position=< 8, -2> velocity=< 0,  1>
// position=<15,  0> velocity=<-2,  0>
// position=< 1,  6> velocity=< 1,  0>
// position=< 8,  9> velocity=< 0, -1>
// position=< 3,  3> velocity=<-1,  1>
// position=< 0,  5> velocity=< 0, -1>
// position=<-2,  2> velocity=< 2,  0>
// position=< 5, -2> velocity=< 1,  2>
// position=< 1,  4> velocity=< 2,  1>
// position=<-2,  7> velocity=< 2, -2>
// position=< 3,  6> velocity=<-1, -1>
// position=< 5,  0> velocity=< 1,  0>
// position=<-6,  0> velocity=< 2,  0>
// position=< 5,  9> velocity=< 1, -2>
// position=<14,  7> velocity=<-2,  0>
// position=<-3,  6> velocity=< 2, -1>`.trim().split('\n')

const points = input.map(p => {
  const startPosition = p.indexOf('<')
  const endPosition = p.indexOf('>')

  let position = p.slice(startPosition + 1, endPosition).split(', ')

  const startVelocity = p.indexOf('<', endPosition + 1)
  const endVelocity = p.indexOf('>', endPosition + 1)

  let velocity = p.slice(startVelocity + 1, endVelocity).split(', ')

  return {
    position: {x: parseInt(position[0]), y: parseInt(position[1])},
    velocity: {x: parseInt(velocity[0]), y: parseInt(velocity[1])}
  }
})

const performStep = points => {
  points.forEach((_, i) => {
    const point = points[i]

    point.position.x = point.position.x + point.velocity.x
    point.position.y = point.position.y + point.velocity.y
  })
}

const getHeight = points => {
  const minMax = points.reduce((acc, point) => {
    if (point.position.y < acc.minY) acc.minY = point.position.y
    if (point.position.y > acc.maxY) acc.maxY = point.position.y

    return acc
  }, { minY: 9999, maxY: -9999 })

  return minMax.maxY - minMax.minY + 1
}

const printPoints = points => {
  const minMax = points.reduce((acc, point) => {
    if (point.position.y < acc.minY) acc.minY = point.position.y
    if (point.position.y > acc.maxY) acc.maxY = point.position.y

    if (point.position.x < acc.minX) acc.minX = point.position.x
    if (point.position.x > acc.maxX) acc.maxX = point.position.x

    return acc
  }, { minY: 9999, maxY: -9999, minX: 9999, maxX: -9999 })

  const grid = []

  points.forEach(p => {
    const po = p.position
    grid[po.x + po.y * (minMax.maxX + 1 - minMax.minX)] = 'X'
  })

  let lines = ''
  for (var i = minMax.minY; i < minMax.maxY + 1; i++) {
    for (let j = minMax.minX; j < minMax.maxX + 1; j++) {
      if (grid[j + i * (minMax.maxX + 1 - minMax.minX)]) lines += '#'
      else lines += ' '
    }
    lines += '\n'
  }

  console.log(lines)
}

let i = 0
do {
  performStep(points)
  i++
} while (getHeight(points) !== 10)

printPoints(points)
console.log(i)
