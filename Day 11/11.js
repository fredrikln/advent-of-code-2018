const serial = 8141

const cellValue = (x, y) => {
  const rackId = x + 10
  let powerLevel = (((rackId * y) + serial) * rackId)

  let hundreth = parseInt(powerLevel.toString().slice(-3, -2)) || 0

  return hundreth - 5
}

const grid = []

const gridSize = 300

for (let x = 0; x < gridSize; x++) {
  for (let y = 0; y < gridSize; y++) {
    const current = cellValue(x, y) || 0
    const above = grid[x + (y - 1) * gridSize] || 0
    const left = grid[(x - 1) + y * gridSize] || 0
    const leftabove = grid[(x - 1) + (y - 1) * gridSize] || 0

    grid[x + y * gridSize] = current + above + left - leftabove
  }
}

const getCellValue = (x, y) => x < 0 || y < 0 ? 0 : grid[x + y * gridSize] || 0

const getSquareValue = (x, y, squareSize = 3) => {
  return getCellValue(x + squareSize - 1, y + squareSize - 1) +
    getCellValue(x - 1, y - 1) -
    getCellValue(x + squareSize - 1, y - 1) -
  getCellValue(x - 1, y + squareSize - 1)
}

let bestTopLeftX = 0
let bestTopLeftY = 0
let bestValue = 0
for (let y = 0; y < gridSize - 2; y++) {
  for (let x = 0; x < gridSize - 2; x++) {
    const value = getSquareValue(x, y, 3)
    if (value > bestValue) {
      bestTopLeftX = x
      bestTopLeftY = y

      bestValue = value
    }
  }
}

console.log(JSON.stringify({
  bestTopLeftX, bestTopLeftY, bestValue
}, null, 2))

bestTopLeftX = 0
bestTopLeftY = 0
bestValue = 0
let bestSquareSize = 1
for (let i = 0; i < gridSize; i++) {
  for (let y = 0; y < gridSize - i; y++) {
    for (let x = 0; x < gridSize - i; x++) {
      const value = getSquareValue(x, y, i)
      if (value > bestValue) {
        bestTopLeftX = x
        bestTopLeftY = y
        bestValue = value
        bestSquareSize = i
      }
    }
  }
}

console.log(JSON.stringify({
  bestTopLeftX, bestTopLeftY, bestSquareSize, bestValue
}, null, 2))
