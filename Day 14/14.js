const chain = {v: 3, l: null, r: null}
chain.r = {v: 7, l: chain, r: chain}
chain.l = chain.r

let end = chain.r

let elf1 = chain
let elf2 = chain.r

const turns = 21000000

// Part 1
for (let j = 0; j < turns + 10; j++) {
  let elf1Recipe = elf1.v
  let elf2Recipe = elf2.v

  let newRecipe = elf1Recipe + elf2Recipe

  let tens = Math.floor(newRecipe / 10)
  let ones = newRecipe % 10

  if (tens > 0) {
    end.r = {v: tens, r: chain, l: end}
    end = end.r
  }
  end.r = {v: ones, r: chain, l: end}
  end = end.r

  for (let i = 0; i < elf1Recipe + 1; i++) {
    elf1 = elf1.r
  }
  for (let i = 0; i < elf2Recipe + 1; i++) {
    elf2 = elf2.r
  }
}

let pointer = chain
for (let i = 0; i < 864801; i++) {
  pointer = pointer.r
}
let val = ''
for (let i = 0; i < 10; i++) {
  val += pointer.v
  pointer = pointer.r
}

console.log('Result Part 1:', val)

pointer = chain
val = ''
let counter = 0
let search = '864801'
while (true) {
  counter++
  val += pointer.v
  val = val.slice(-search.length)

  if (val === search) {
    console.log('Result Part 2:', counter - search.length)
    break
  }

  pointer = pointer.r

  if (pointer === chain) {
    console.log('Did not find result')
    break
  }

  if (counter % 1000000 === 0) {
    console.log(counter)
  }
}

// console.log(recipes.slice(864801, 864801 + 10).join(''))
// recipes.join('').indexOf('864801')
