const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").trim();

let map = input.split("\n").reduce((acc, claim) => {
  const [id, claimData] = claim.split(" @ ");

  let [coords, size] = claimData.split(": ");

  coords = coords.split(",");
  size = size.split("x");

  acc[id] = {
    coords: [parseInt(coords[0]), parseInt(coords[1])],
    size: [parseInt(size[0]), parseInt(size[1])]
  };

  return acc;
}, {});

/* const [largestX,largestY] = Object.keys(map).reduce((acc, key) => {
  const claim = map[key];

  if (parseInt(claim.coords[0]) + parseInt(claim.size[0]) > acc[0]) {
    acc[0] = parseInt(claim.coords[0]) + parseInt(claim.size[0])
  }
  if (parseInt(claim.coords[1]) + parseInt(claim.size[1]) > acc[1]) {
    acc[1] = parseInt(claim.coords[1]) + parseInt(claim.size[1])
  }

  return acc
}, [0,0]) */

// const canvas = []

function overlap(claimA, claimB) {
  const ax1 = claimA.coords[0];
  const ax2 = claimA.coords[0] + claimA.size[0];
  const ay1 = claimA.coords[1];
  const ay2 = claimA.coords[1] + claimA.size[1];

  const bx1 = claimB.coords[0];
  const bx2 = claimB.coords[0] + claimB.size[0];
  const by1 = claimB.coords[1];
  const by2 = claimB.coords[1] + claimB.size[1];
  // console.log({ax1, ax2, ay1, ay2})
  // console.log({bx1, bx2, by1, by2})
  // console.log(ax1, bx2, ax1 < bx2)
  // console.log(ax2, bx1, ax2 > bx1)
  // console.log(ay1, by2, ay1 > by2)
  // console.log(ay2, by1, ay2 < by1)

  return ax1 < bx2 && ax2 > bx1 && ay1 < by2 && ay2 > by1;
}

// const claimA = {
//   coords: [1, 3],
//   size: [4, 4]
// }
// const claimB = {
//   coords: [3, 1],
//   size: [4, 4]
// }
// const claimC = {
//   coords: [5, 5],
//   size: [2, 2]
// }

// map = {}
// map['#1'] = claimA
// map['#2'] = claimB
// map['#3'] = claimC

// console.log(overlap(claimA, claimB))
// console.log(overlap(claimA, claimC))
// console.log(overlap(claimB, claimC))

const keys = Object.keys(map);
for (var i = 0; i < keys.length; i++) {
  const A = map[keys[i]];
  let overlaps = false;

  for (var j = 0; j < keys.length; j++) {
    const B = map[keys[j]];

    if (A === B) {
      continue;
    }

    if (overlap(A, B)) {
      overlaps = true;
      break;
    }
  }

  if (!overlaps) {
    console.log(keys[i]);
  }
}

// Object.keys(map).forEach(key => {
//   const claim = map[key]
//   for (var x = parseInt(claim.coords[0]); x < parseInt(claim.coords[0]) + parseInt(claim.size[0]); x++) {
//     for (var y = parseInt(claim.coords[1]); y < parseInt(claim.coords[1]) + parseInt(claim.size[1]); y++) {
//       if (!canvas[x + y * 6]) {
//         canvas[x + y * 6] = 0
//       }

//       canvas[x + y * 6]++
//     }
//   }
// })
// console.log(canvas)
// console.log(canvas.filter(a => a >= 2).length)
