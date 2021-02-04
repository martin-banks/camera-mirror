import groupPixels from './group-pixels'


function captureFromWebcam (props) {
  const {
    videoSize,
    videoRef,
    canvasRef,
    previewRefLeft,
    previewRefRight,
    duration,
    setCameraLive,
  } = props

  const { width, height } = videoSize

  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width, height },
  })
    .then(localMediaStream => {
      // const videoTrack = localMediaStream.getVideoTracks()[0]
      // const videoTrackCapabilities = videoTrack.getCapabilities()
      const ctx = canvasRef.current.getContext('2d')
      const previewCtxLeft = previewRefLeft.current.getContext('2d')
      const previewCtxRight = previewRefRight.current.getContext('2d')
      let updateLoop = null

      videoRef.current.srcObject = localMediaStream
      videoRef.current.play()

      setTimeout(() => {
        canvasRef.current.width = width
        canvasRef.current.height = height

        previewRefLeft.current.width = width
        previewRefLeft.current.height = height

        previewRefRight.current.width = width
        previewRefRight.current.height = height

        updateLoop = setInterval(async () => {
          ctx.drawImage(
            videoRef.current,
            0, 0,
            videoRef.current.videoWidth,
            videoRef.current.videoHeight
          )
          const groupedPixels = await groupPixels({
            videoSize,
            pixels: ctx.getImageData(0, 0, width, height)
          })
          previewCtxLeft.putImageData(
            groupedPixels.left,
            0,0,0,0,
            width,
            height,
          )
          previewCtxRight.putImageData(
            groupedPixels.right,
            0,0,0,0,
            width,
            height,
          )
          // get the pixels of the image
          // canvas width and height is available on this pixels object
          // Useful for dynamic sizing
          // const pixels = ctx.getImageData(0, 0, videoWidth, videoWidth)
          // updatePixelState(pixels)
        }, 42) // interval update
      }, 100)

      setTimeout(async () => {
        // Cancel the update loop after timep period
        clearInterval(updateLoop)
        videoRef.current.pause()
        setCameraLive(false)
        localMediaStream.getTracks().forEach(t => t.stop())
      }, duration)
    })
    .catch(err => {
      console.error('-- MEDIA STREAM ERROR --')
      console.trace(err)
      throw err
    })
}

export default captureFromWebcam
