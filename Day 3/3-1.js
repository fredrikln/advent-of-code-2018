const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").trim();

const map = input.split("\n").reduce((acc, claim) => {
  const [id, claimData] = claim.split(" @ ");

  let [coords, size] = claimData.split(": ");

  coords = coords.split(",");
  size = size.split("x");

  acc[id] = {
    coords,
    size
  };

  return acc;
}, {});

const [largestX, largestY] = Object.keys(map).reduce(
  (acc, key) => {
    const claim = map[key];

    if (parseInt(claim.coords[0]) + parseInt(claim.size[0]) > acc[0]) {
      acc[0] = parseInt(claim.coords[0]) + parseInt(claim.size[0]);
    }
    if (parseInt(claim.coords[1]) + parseInt(claim.size[1]) > acc[1]) {
      acc[1] = parseInt(claim.coords[1]) + parseInt(claim.size[1]);
    }

    return acc;
  },
  [0, 0]
);

const canvas = [];

Object.keys(map).forEach(key => {
  const claim = map[key];
  for (
    var x = parseInt(claim.coords[0]);
    x < parseInt(claim.coords[0]) + parseInt(claim.size[0]);
    x++
  ) {
    for (
      var y = parseInt(claim.coords[1]);
      y < parseInt(claim.coords[1]) + parseInt(claim.size[1]);
      y++
    ) {
      if (!canvas[x + y * 1000]) {
        canvas[x + y * 1000] = 0;
      }

      canvas[x + y * 1000]++;
    }
  }
});

console.log(canvas.filter(a => a >= 2).length);
