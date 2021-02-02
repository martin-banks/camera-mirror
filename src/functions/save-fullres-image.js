import groupPixels from './group-pixels'


function storeFullResImage (props) {
  const {
    canvasRef,
    videoRef,
    setCameraLive,
  } = props

  const ctx = canvasRef.current.getContext('2d')

  return navigator.mediaDevices
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



export default downloadFullResImage
