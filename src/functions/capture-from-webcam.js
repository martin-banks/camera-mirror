import arrayMirror from './array-mirror'


function groupPixels ({ pixels, videoSize }) {
  const count = pixels?.data?.length / 4
  const output = {
    width: pixels.width,
    height: pixels.height,
    data: [],
  }
  for (let i = 0; i < count; i++) {
    const start = 4 * i
    const end = start + 4
    output.data.push([...pixels.data.slice(start, end)])
  }

  const mirrored = arrayMirror({ ratio: [videoSize.width, videoSize.height], data: output.data })

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

  return readyToRender
}

function captureFromWebcam ({ videoSize, videoRef, canvasRef, previewRefLeft, previewRefRight, duration, setCameraLive }) {

  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: videoSize.width,
      height: videoSize.height,
    },
  })
    .then(localMediaStream => {
      console.log(localMediaStream)
      videoRef.current.srcObject = localMediaStream

      const videoTrack = localMediaStream.getVideoTracks()[0]
      const videoTrackCapabilities = videoTrack.getCapabilities()
      console.log({ videoTrack, videoTrackCapabilities })

      const ctx = canvasRef.current.getContext('2d')
      const previewCtxLeft = previewRefLeft.current.getContext('2d')
      const previewCtxRight = previewRefRight.current.getContext('2d')

      let updateLoop = null

      videoRef.current.play()

      setTimeout(() => {
        canvasRef.current.width = videoSize.width
        canvasRef.current.height = videoSize.height

        previewRefLeft.current.width = videoSize.width
        previewRefLeft.current.height = videoSize.height

        previewRefRight.current.width = videoSize.width
        previewRefRight.current.height = videoSize.height

        updateLoop = setInterval(() => {
          ctx.drawImage(
            videoRef.current,
            0, 0,
            videoRef.current.videoWidth,
            videoRef.current.videoHeight
          )
          previewCtxLeft.putImageData(
            groupPixels({
              videoSize,
              pixels: ctx.getImageData(0, 0, videoSize.width, videoSize.height)
            }).left,
            0,0,0,0,
            videoSize.width,
            videoSize.height,
          )
          previewCtxRight.putImageData(
            groupPixels({
              videoSize,
              pixels: ctx.getImageData(0, 0, videoSize.width, videoSize.height)
            }).right,
            0,0,0,0,
            videoSize.width,
            videoSize.height,
          )
          // get the pixels of the image
          // canvas width and height is available on this pixels object
          // Useful for dynamic sizing
          // const pixels = ctx.getImageData(0, 0, videoWidth, videoWidth)
          // updatePixelState(pixels)
        }, 32) // interval update
      }, 1000)

      setTimeout(() => {
        // Cancel the update loop after timep period
        clearInterval(updateLoop)
        videoRef.current.pause()
        setCameraLive(false)
        localMediaStream.getTracks().forEach(t => t.stop())
      }, duration)
    })
    .catch(err => {
      console.error('-- MEDIA STREAM ERROR --\n', err)
    })
}

export default captureFromWebcam
