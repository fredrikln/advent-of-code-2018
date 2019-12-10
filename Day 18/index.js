const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')

const grid = []
const height = input.length
const width = input[0].length

const getCell = (grid, x, y) => {
  if (x < 0 || x > width-1) return undefined
  if (y < 0 || y > height-1) return undefined

  return grid[y][x]
}


input.forEach((row, y) => row.split('').forEach((char, x) => {
  if (!grid[y]) grid[y] = []
  grid[y][x] = char
}))

let open = '.'
let tree = '|'
let lumberyard = '#'

const count = grid => {
  let acc = { open: 0, tree: 0, lumberyard: 0 }

  for (let i = 0; i < width*height; i++) {
    let y = Math.floor(i / width)
    let x = i % width

    let next = getCell(grid, x, y)

    switch (next) {
      case open:
        acc['open']++
        break

      case tree:
        acc['tree']++
        break

      case lumberyard:
        acc['lumberyard']++
        break
    }
  }

  return acc
}

const drawGrid = grid => {
  for (let i = 0; i < height; i++) {
    let out = ''
    for (let j = 0; j < width; j++) {
      let char = getCell(grid, j, i)
      out += char
    }
    console.log(out)
  }
}

const step = (grid) => {
  let out = []

  for (let y in grid) {
    y = parseInt(y, 10)
    for (let x in grid) {
      x = parseInt(x, 10)
      const curCell = getCell(grid, x, y)

      let adjacentTrees = 0
      let adjacentOpen = 0
      let adjacentLumberyards = 0

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue

          if (getCell(grid, x+i, y+j) === open) adjacentOpen++
          if (getCell(grid, x+i, y+j) === tree) adjacentTrees++
          if (getCell(grid, x+i, y+j) === lumberyard) adjacentLumberyards++
        }
      }

      if (!out[y]) out[y] = []

      switch (curCell) {
        case open:
          if (adjacentTrees >= 3) { out[y][x] = tree }
          else { out[y][x] = open }
          break

        case tree:
          if (adjacentLumberyards >= 3) { out[y][x] = lumberyard }
          else { out[y][x] = tree }
          break

        case lumberyard:
          if (adjacentLumberyards > 0 && adjacentTrees > 0) { out[y][x] = lumberyard }
          else { out[y][x] = open }
          break
      }
    }
  }

  return out
}

const getCycleName = grid => grid.map(row => row.join('')).join('')

let newGrid = grid
for (let i = 0; i < 10; i++) {
  newGrid = step(newGrid)
}

let { tree: treeCount, lumberyard: lumberyardCount } = count(newGrid)
console.log('Part 1:', treeCount * lumberyardCount)

newGrid = grid
// Arbitrary number of steps

let cycles = new Set()
for (let i = 0; i < 500; i++) {
  newGrid = step(newGrid)
  let name = getCycleName(newGrid)
  cycles.add(name)
}
let repeatingAfter = cycles.size

cycles = new Set()
for (let i = 0; i < 500; i++) {
  newGrid = step(newGrid)
  let name = getCycleName(newGrid)
  cycles.add(name)
}
let cycleLength = cycles.size
repeatingAfter = repeatingAfter - cycleLength
// console.log(repeatingAfter, cycleLength)

newGrid = grid
for (let i = 0; i < repeatingAfter + ((1000000000 - repeatingAfter) % cycles.size); i++) {
  newGrid = step(newGrid)
}

let { tree: treeCount2, lumberyard: lumberyardCount2 } = count(newGrid)
console.log('Part 2:', treeCount2 * lumberyardCount2)
