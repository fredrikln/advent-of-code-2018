const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf-8').split('\n')
deleteCollisions = true

const makeCart = (direction, x, y) => {
  return {
    nextTurn: 0,
    position: { x: x, y: y },
    direction,
    makeTick: function (map) {
      if (this.direction === '^') this.position = {x: this.position.x, y: this.position.y - 1}
      else if (this.direction === '>') this.position = {x: this.position.x + 1, y: this.position.y}
      else if (this.direction === '<') this.position = {x: this.position.x - 1, y: this.position.y}
      else if (this.direction === 'v') this.position = {x: this.position.x, y: this.position.y + 1}

      if (map[this.position.y][this.position.x] === '+' && this.nextTurn === 0) {
        if (this.direction === '^') this.direction = '<'
        else if (this.direction === '<') this.direction = 'v'
        else if (this.direction === '>') this.direction = '^'
        else if (this.direction === 'v') this.direction = '>'
        this.nextTurn = 1
      } else if (map[this.position.y][this.position.x] === '+' && this.nextTurn === 1) {
        if (this.direction === '^') this.direction = '^'
        else if (this.direction === '<') this.direction = '<'
        else if (this.direction === '>') this.direction = '>'
        else if (this.direction === 'v') this.direction = 'v'
        this.nextTurn = 2
      } else if (map[this.position.y][this.position.x] === '+' && this.nextTurn === 2) {
        if (this.direction === '^') this.direction = '>'
        else if (this.direction === '<') this.direction = '^'
        else if (this.direction === '>') this.direction = 'v'
        else if (this.direction === 'v') this.direction = '<'
        this.nextTurn = 0
      } else if (map[this.position.y][this.position.x] === '/') {
        if (this.direction === '^') this.direction = '>'
        else if (this.direction === '<') this.direction = 'v'
        else if (this.direction === '>') this.direction = '^'
        else if (this.direction === 'v') this.direction = '<'
      } else if (map[this.position.y][this.position.x] === '\\') {
        if (this.direction === '^') this.direction = '<'
        else if (this.direction === '<') this.direction = '^'
        else if (this.direction === '>') this.direction = 'v'
        else if (this.direction === 'v') this.direction = '>'
      }
    }
  }
}

const parseMap = input => {
  const map = []
  const carts = []

  const longest = Math.max(...input.map(l => l.length))
  for (let y = 0; y < input.length; y++) {
    if (!map[y]) map[y] = []
    for (let x = 0; x < longest; x++) {
      const char = input[y][x]
      if (char === '>') {
        carts.push(makeCart(char, x, y))
        map[y][x] = '-'
      } else if (char === '^') {
        carts.push(makeCart(char, x, y))
        map[y][x] = '|'
      } else if (char === '<') {
        carts.push(makeCart(char, x, y))
        map[y][x] = '-'
      } else if (char === 'v') {
        carts.push(makeCart(char, x, y))
        map[y][x] = '|'
      } else {
        map[y][x] = char || ' '
      }
    }
  }

  return [map, carts]
}

const drawMap = (map, carts) => {
  let string = ''
  for (let i = 0; i < map.length; i++) {
    const line = map[i]

    for (let j = 0; j < line.length; j++) {
      const cart = carts.find(c => c.position.y === i && c.position.x === j)
      if (cart && line[j] !== 'X') {
        string += cart.direction
      } else {
        string += line[j]
      }
    }

    string += '\n'
  }

  return string
}

let collision = false
let collisionX = 0
let collisionY = 0

let [map, carts] = parseMap(input)

let counter = 0
// for (let i = 0; i < 3; i++) {
while (true) {
  carts.sort((a, b) => {
    if (a.position.y < b.position.y) { return -1 }
    if (a.position.y === b.position.y) {
      if (a.position.x < b.position.x) {
        return -1
      } else { return 1 }
    } else {
      return 1
    }
  })

  const collided = []
  for (let q = 0; q < carts.length; q++) {
    carts[q].makeTick(map)

    for (let j = carts.length-1; j >= 0; j--) {
      const cart1 = carts[j]
      for (let k = carts.length-1; k >= 0; k--) {
        const cart2 = carts[k]
        if (cart1 === cart2) {
          continue
        }

        if (cart1.position.x === cart2.position.x && cart1.position.y === cart2.position.y) {
          if (deleteCollisions) {
            collided.push(cart1, cart2)
          } else {
            collisionX = cart1.position.x
            collisionY = cart1.position.y
            collision = true
          }
        }
      }
    }
  }

  carts = carts.filter(c => collided.indexOf(c) === -1)

  console.log('\033c')

  if (carts.length == 1) {
    console.log(drawMap(map, carts))
    console.log(carts[0].position.x, carts[0].position.y)
    break;
  }

  if (collision) {
    map[collisionY][collisionX] = 'X'
    console.log(drawMap(map, carts))
    console.log({ collisionX, collisionY })
    break
  }

  // if (counter % 100 === 0) {
  //   console.log(drawMap(map, carts))
  // }
  counter++
}
