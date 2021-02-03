import arrayMirror from './array-mirror'

function groupPixels ({ pixels, videoSize, delay }) {

  return new Promise(async (resolve, reject) => {
    try {
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
      const mirrored = await arrayMirror({
        ratio: [videoSize.width, videoSize.height],
        data: output.data,
        delay,
      })


      // Take the mirrored 2d arrays and split back
      // into array of continous rgba values
      const mirrorSplitLeft = []
      const mirrorSplitRight = []
      for (let i = 0; i < mirrored.left.length; i++) {
        mirrorSplitLeft.push(...mirrored.left[i])
        mirrorSplitRight.push(...mirrored.right[i])
      }

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

      resolve(readyToRender)

    } catch (err) {
      console.log('-- ERROR GROUPING PIXELS --\n', err)
      throw reject(err)
    }

  })
}

export default groupPixels
