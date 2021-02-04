import React, { useContext } from 'react'

import groupPixels from './group-pixels'


function storeFullResImage (props) {
  const {
    // canvasRef,
    setCameraLive,
    fullResRef,
    hiddenVideoRef,
    duration,
  } = props


  return new Promise((resolve, reject) => {
    const ctx = fullResRef.current.getContext('2d')

    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then(localMediaStream => {
        const videoTrack = localMediaStream.getVideoTracks()[0]
        const track = videoTrack.getCapabilities()

        console.log({ track })

        hiddenVideoRef.current.width = `${track.width.max}px`
        hiddenVideoRef.current.height = `${track.height.max}px`

        hiddenVideoRef.current.srcObject = localMediaStream
        hiddenVideoRef.current.play()

        fullResRef.current.width = track.width.max
        ctx.width = track.width.max
        fullResRef.current.height = track.height.max
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
            const groupedPixels_fullSize = await groupPixels(options)
            resolve(groupedPixels_fullSize)
          }, duration + 100)

        })
      })
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        throw reject(error)
      })
  })
}


export default storeFullResImage
