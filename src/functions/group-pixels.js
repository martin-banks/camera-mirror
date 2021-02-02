import arrayMirror from './array-mirror'

function groupPixels ({ pixels, videoSize }) {
  const count = pixels?.data?.length / 4
  const output = {
    width: pixels.width,
    height: pixels.height,
    data: [],
  }

  // TODO
  // - Too many loops

  // Loop to generate arrays of pixel colors [r,g,b,a]
  for (let i = 0; i < count; i++) {
    const start = 4 * i
    const end = start + 4
    output.data.push([...pixels.data.slice(start, end)])
  }
  
  // Process the array of rgba groups
  // to create the left and right flips
  const mirrored = arrayMirror({
    ratio: [videoSize.width, videoSize.height],
    data: output.data,
  })


  // Take the mirrored 2d arrays and split back
  // into array of continous rgba values
  const mirrorSplitLeft = []
  const mirrorSplitRight = []
  for (let i = 0; i < mirrored.left.length; i++) {
    mirrorSplitLeft.push(...mirrored.left[i])
    mirrorSplitRight.push(...mirrored.right[i])
  }

  // TODO
  // - Rewrite as async to ensure all pixels have been processed
  // - Too many to complete with full res images
  // - Probably cause failure on lower power devices

  const readyToRender = {
    left: new ImageData(
      Uint8ClampedArray.from(mirrorSplitLeft),
      pixels.width,
      pixels.height,
    ),
    right: new ImageData(
      Uint8ClampedArray.from(mirrorSplitRight),
      pixels.width,
      pixels.height,
    ),
  }

  return readyToRender
}

export default groupPixels
