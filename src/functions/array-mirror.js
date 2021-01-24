// Sample data

// const ratio = [7, 5]
// const data = [
//   0, 1, 2, 3, 4, 5, 6,
//   7, 8, 9, 10, 11, 12, 13,
//   14, 15, 16, 17, 18, 19, 20,
//   21, 22, 23, 24, 25, 26, 27,
//   28, 29, 30, 31, 32, 33, 34,
// ]


function arrayMirror({ data, ratio }) {
  if (!data) return
  // console.log({ data })

  const leftSideMirror = []
  const rightSideMirror = []

  const halfRowLeft = Math.ceil(ratio[0] / 2)
  const halfRowRight = Math.floor(ratio[0] / 2)

  // We know that the data represents rows and columns and how many there are of each
  // Performing a loop over the number of rows, we can split the data into each row.
  // These can in turn be split in half for the left and right respectively
  // Now we have each half, they can be duplicated, reversed and combined with the original
  // This resulting data is then pushed (with spread) into the output array
  for (let row = 0; row < ratio[1]; row++) {
    // Determine the row we are operation
    const rowStart = row * ratio[0]

    // The left side data is the first half
    const leftDataSet = data.slice(
      rowStart,
      rowStart + halfRowLeft
    )
    // Right side is the second
    const rightDataSet = data.slice(
      rowStart + halfRowRight,
      rowStart + ratio[0]
    )

    // Using spread operators and slice means we are not contaminating the original data
    // And will let ups push each value into the output arrays, this is more efficient than another loop
    leftSideMirror.push(...leftDataSet)
    // leftSideMirror.push(...leftDataSet.slice(0, leftDataSet.length - 1).reverse())
    leftSideMirror.push(...leftDataSet.reverse())

    // rightSideMirror.push(...rightDataSet.slice(1, rightDataSet.length).reverse())
    rightSideMirror.push(...[...rightDataSet].reverse())
    rightSideMirror.push(...rightDataSet)

    // Helps us to manually check we are serating the data correctly
    // console.log({ leftDataSet, rightDataSet })
  }

  return {
    left: leftSideMirror,
    right: rightSideMirror,
  }

}


export default arrayMirror