const runGame = (totalPlayers, turns) => {
  const game = [0]

  let turn = 1
  let current = 0

  let playerScores = {}

  const placeMarble = (turn) => {
    const length = game.length

    if (turn % 23 !== 0) {
      const oneRight = (current + 1) % length

      current = oneRight + 1

      game.splice(current, 0, turn)

      return 0
    } else {
      if (!playerScores[turn % totalPlayers]) playerScores[turn % totalPlayers] = 0

      playerScores[turn % totalPlayers] += turn

      const sevenLeft = (current - 7 + length) % length

      const sevenLeftMarble = game.splice(sevenLeft, 1)

      playerScores[turn % totalPlayers] += sevenLeftMarble[0]

      current = sevenLeft

      return (turn + sevenLeftMarble[0])
    }
  }

  for (let i = 0; i < turns + 1; i++) {
    let score = placeMarble(turn++)
    // console.log(i, score)
  }

  const highestScorePlayer = Object.keys(playerScores).sort((a, b) => playerScores[a] < playerScores[b] ? 1 : -1)[0]
  return playerScores[highestScorePlayer]
}

// console.log(runGame(10, 1618))
// console.log(runGame(13, 7999))
// console.log(runGame(17, 1104))
// console.log(runGame(21, 6111))
// console.log(runGame(30, 5807))

const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').trim().split(' ')
const turns = parseInt(input[6])
const players = parseInt(input[0])

// console.log(turns, players)

console.log(runGame(players, turns))

// console.log(game)
