const runGame = (totalPlayers, turns) => {
  let turn = 1
  let startNode = {cw: null, ccw: null, value: 0}
  startNode.cw = startNode
  startNode.ccw = startNode

  let current = startNode

  let playerScores = {}

  const placeMarble = (turn) => {
    if (turn % 23 !== 0) {
      const after = current.cw

      const newNode = { cw: after.cw, ccw: after, value: turn }
      after.cw.ccw = newNode
      after.cw = newNode

      current = newNode

      return 0
    } else {
      if (!playerScores[turn % totalPlayers]) playerScores[turn % totalPlayers] = 0

      let nextNode = current
      for (let i = 0; i < 7; i++) {
        nextNode = nextNode.ccw
      }

      playerScores[turn % totalPlayers] += nextNode.value + turn

      nextNode.ccw.cw = nextNode.cw
      nextNode.cw.ccw = nextNode.ccw

      current = nextNode.cw

      return nextNode.value + turn
    }
  }

  for (let i = 0; i < turns + 1; i++) {
    let score = placeMarble(turn++)
    // console.log(i, score)
  }

  // let nextNode = startNode
  // do {
  //   console.log(nextNode.value)
  //   nextNode = nextNode.cw
  // } while (nextNode !== startNode)

  const highestScorePlayer = Object.keys(playerScores).sort((a, b) => playerScores[a] < playerScores[b] ? 1 : -1)[0]
  return playerScores[highestScorePlayer]
}

// console.log(9, 25, runGame(9, 23))

console.log(10, 1618, runGame(10, 1618))
console.log(13, 7999, runGame(13, 7999))
console.log(17, 1104, runGame(17, 1104))
console.log(21, 6111, runGame(21, 6111))
console.log(30, 5807, runGame(30, 5807))

const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').trim().split(' ')
const turns = parseInt(input[6])
const players = parseInt(input[0])

// console.log(turns, players)

console.log(players, turns, runGame(players, turns))
console.log(players, turns * 100, runGame(players, turns * 100))

// console.log(game)
