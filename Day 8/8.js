const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8').trim().split(' ').map(i => parseInt(i))

// const input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'.trim().split(' ').map(i => parseInt(i))

const buildNode = (input) => {
  const header = input.slice(0, 2)
  const countNodes = header[0]
  const countMetadata = header[1]
  let data = input.slice(2)
  const nodes = []

  let totalLength = 2
  for (let i = 0; i < countNodes; i++) {
    const [node, length] = buildNode(data)
    nodes.push(node)
    data = data.slice(length)
    totalLength += length
  }
  const metadata = data.slice(0, countMetadata)
  totalLength += countMetadata

  // More data left in data, but that is not this node's data

  return [
    {
      header,
      nodes,
      metadata
    },
    totalLength
  ]
}

// const getNextNodeLength = (input) => {
//   const header = input.slice(0, 2)
//   const countNodes = header[0]
//   const countMetadata = header[1]
//   let nodeData = input.slice(2, input.length - countMetadata)

//   if (countNodes === 0) {
//     return 2 + countMetadata
//   } else {
//     let sum = 0
//     for (let i = 0; i < countNodes; i++) {
//       let length = getNextNodeLength(nodeData)
//       sum += length
//       nodeData = nodeData.slice(length)
//     }
//     return 2 + sum + countMetadata
//   }
// }

const sumMetadata = (node) => {
  let sum = node.metadata.reduce((acc, metadata) => acc + metadata, 0)

  sum += node.nodes.reduce((acc, node) => acc + sumMetadata(node), 0)

  return sum
}

const sumMetadata2 = (node) => {
  let sum = 0
  if (node.nodes.length === 0) {
    sum += node.metadata.reduce((acc, metadata) => acc + metadata, 0)
  } else {
    for (let i = 0; i < node.metadata.length; i++) {
      const index = node.metadata[i] - 1
      const metaNode = node.nodes[index]
      if (metaNode) {
        sum += sumMetadata2(metaNode)
      }
    }
  }

  return sum
}

const [rootNode, length] = buildNode(input)

// console.log(JSON.stringify(rootNode, null, 2))
console.log('Node\'s data length equals input length:', length === input.length)

const sum = sumMetadata(rootNode)
const sum2 = sumMetadata2(rootNode)
console.log(sum)
console.log(sum2)
