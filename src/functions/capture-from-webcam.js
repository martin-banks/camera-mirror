import groupPixels from './group-pixels'



function storeFullResImage (props) {
  const {
    canvasRef,
    videoRef,
    setCameraLive,
  } = props

  const ctx = canvasRef.current.getContext('2d')

  navigator.mediaDevices
    .getUserMedia({ audio: false, video: true })
    .then(localMediaStream => {
      const videoTrack = localMediaStream.getVideoTracks()[0]
      const track = videoTrack.getCapabilities()
      console.log({ videoTrack, track })

      videoRef.current.srcObject = localMediaStream
      videoRef.current.play()

      ctx.drawImage(
        videoRef.current,
        0, 0,
        track.width.max,
        track.height.max,
      )

      setTimeout(() => {
        videoRef.current.pause()
        setCameraLive(false)
        localMediaStream.getTracks().forEach(t => t.stop())

        console.log('context', ctx.getImageData(0, 0, track.width.max, track.height.max))
        const groupedPixels = groupPixels({
          videoSize: {
            width: track.width.max,
            left: track.height.max,
          },
          pixels: ctx.getImageData(0, 0, track.width.max, track.height.max)
        })

        console.log({ groupedPixels })
      }, 1000)

      return true // groupedPixels
    })
    .catch(error => {
      console.error('-- ERROR CREATING FULL IMAGE --\n', error)
      console.trace(error)
      return false
    })
}


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

      // const videoTrack = localMediaStream.getVideoTracks()[0]
      // const videoTrackCapabilities = videoTrack.getCapabilities()
      // console.log({ videoTrack, videoTrackCapabilities })

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
          const groupedPixels = groupPixels({
            videoSize,
            pixels: ctx.getImageData(0, 0, videoSize.width, videoSize.height)
          })
          previewCtxLeft.putImageData(
            groupedPixels.left,
            0,0,0,0,
            videoSize.width,
            videoSize.height,
          )
          previewCtxRight.putImageData(
            groupedPixels.right,
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

      setTimeout(async () => {
        // Cancel the update loop after timep period
        clearInterval(updateLoop)
        videoRef.current.pause()
        setCameraLive(false)
        localMediaStream.getTracks().forEach(t => t.stop())

        storeFullResImage(props)

        // TODO
        // - Get max resolution of camera
        // - Create new object data at full size
        // - Use this data as source for cerating downloadable images
        // ? Store max res image data in local storage (?)

      }, duration)
    })
    .catch(err => {
      console.error('-- MEDIA STREAM ERROR --')
      console.trace( err)
    })
}

export default captureFromWebcam
