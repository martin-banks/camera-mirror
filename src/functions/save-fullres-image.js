import React, { useContext } from 'react'

import groupPixels from './group-pixels'
// import FullResContext from '../context/fullres-context'


function storeFullResImage (props) {
  const {
    canvasRef,
    setCameraLive,
    fullResRef,
    hiddenVideoRef,
    duration,
    storeFullRes,
  } = props

  const ctx = fullResRef.current.getContext('2d')
  // const frc = FullResContext()


  navigator.mediaDevices
    .getUserMedia({ audio: false, video: true })
    .then(localMediaStream => {
      const videoTrack = localMediaStream.getVideoTracks()[0]
      const track = videoTrack.getCapabilities()
      console.log({ videoTrack, track })

      hiddenVideoRef.current.srcObject = localMediaStream
      hiddenVideoRef.current.play()

      // hiddenVideoRef.current.addEventListener('playing', function () {
      // })

      ctx.width = track.width.max
      ctx.height = track.height.max

      return new Promise((resolve, reject) => {
        setInterval(() => {
          ctx.drawImage(
            hiddenVideoRef.current,
            0, 0,
            track.width.max,
            track.height.max,
          )
        }, 42)

        setTimeout(async () => {
          hiddenVideoRef.current.pause()
          setCameraLive(false)
          localMediaStream.getTracks().forEach(t => t.stop())
          const delay = 0 // 30 * 1000
          const options = {
            videoSize: {
              width: track.width.max,
              height: track.height.max,
            },
            pixels: ctx.getImageData(0, 0, track.width.max, track.height.max),
            delay,
          }
          console.log({ options })
          const groupedPixels_fullSize = await groupPixels(options)
          resolve(groupedPixels_fullSize)
        }, duration)

      })

      // setTimeout(async () => {
      //   // videoRef.current.pause()
      //   // setCameraLive(false)
      //   // localMediaStream.getTracks().forEach(t => t.stop())
      //   const delay = 0 // 30 * 1000
      //   const options = {
      //     videoSize: {
      //       width: track.width.max,
      //       height: track.height.max,
      //     },
      //     pixels: ctx.getImageData(0, 0, track.width.max, track.height.max),
      //     delay,
      //   }
      //   console.log({ options })
      //   const groupedPixels_fullSize = await groupPixels(options)

      // }, 100)

      // return true // groupedPixels
    })
    .then(data => {
      console.log({ data })
      // const { setData } = useContext(FullResContext)
      // setData(data)
      // FullResContext.setData(data)
      console.log({ storeFullRes })
      storeFullRes(data)
    })
    .catch(error => {
      console.error('-- ERROR CREATING FULL IMAGE --\n', error)
      console.trace(error.trace)
      throw error
    })
}



export default storeFullResImage
