const serial = 8141
// const serial = 42

const cellValue = (x, y) => {
  const rackId = x + 10
  let powerLevel = (((rackId * y) + serial) * rackId)

  let hundreth = parseInt(powerLevel.toString().slice(-3, -2)) || 0

  return hundreth - 5
}

const grid = []

for (let x = 0; x < 300; x++) {
  for (let y = 0; y < 300; y++) {
    grid[x + y * 300] = cellValue(x, y)
  }
}

const getCellValue = (x, y) => grid[x + y * 300]
const getSquareValue = (x, y, squareSize = 3) => {
  let sum = 0
  for (let i = 0; i < squareSize; i++) {
    for (let j = 0; j < squareSize; j++) {
      sum += getCellValue(x + i, y + j)
    }
  }
  return sum
}

let bestTopLeftX = 0
let bestTopLeftY = 0
let bestValue = 0
for (let y = 0; y < 300 - 2; y++) {
  for (let x = 0; x < 300 - 2; x++) {
    const value = getSquareValue(x, y, 3)
    if (value > bestValue) {
      bestTopLeftX = x
      bestTopLeftY = y

      bestValue = value
    }
  }
}

console.log({
  bestTopLeftX, bestTopLeftY, bestValue
})

bestTopLeftX = 0
bestTopLeftY = 0
bestValue = 0
let bestSquareSize = 1
for (let i = 0; i < 300; i++) {
  for (let y = 0; y < 300 - i; y++) {
    for (let x = 0; x < 300 - i; x++) {
      const value = getSquareValue(x, y, i)
      if (value > bestValue) {
        bestTopLeftX = x
        bestTopLeftY = y
        bestValue = value
        bestSquareSize = i
      }
    }
  }
  console.log(i)
}

console.log({
  bestTopLeftX, bestTopLeftY, bestSquareSize, bestValue
})
