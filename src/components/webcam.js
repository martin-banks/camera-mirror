import React, { useEffect, useRef, useState } from 'react'
import Styled from 'styled-components'
import PropTypes from 'prop-types'

import arrayMirror from '../functions/array-mirror'


const videoWidth = 400
const ratio = [ 400, 400 ]

const Preview = Styled.canvas`
  width: ${p => videoWidth}px;
  height: ${p => videoWidth}px;
  outline: solid 1px cyan;
`

const Canvas = Styled.canvas`
  width: ${p => videoWidth}px;
  height: ${p => videoWidth}px;
  outline: solid 1px purple;
`

const Video = Styled.video`
  width: ${p => videoWidth}px;
  height: ${p => videoWidth}px;
  outline: solid 1px pink;
`

function groupPixels (pixels) {
  // if (!data) return null
  // const pixels = [...data]
  console.log({ pixels })
  const count = pixels?.data?.length / 4
  const output = {
    width: pixels.width,
    height: pixels.height,
    data: [],
  }
  for (let i = 0; i < count; i++) {
    const start = 4 * i
    const end = start + 4
    // pixels.data[start + 1] = 255
    output.data.push([...pixels.data.slice(start, end)])
  }
  // return output
  // console.log({ output })
  const mirrored = arrayMirror({ ratio, data: output.data }).left
  // console.log({ mirrored })
  // return
  const mirrorSplit = []
  for (let i = 0; i < mirrored.length; i++) {
    mirrorSplit.push(...mirrored[i])
  }

  // const newSize = Math.sqrt(mirrorSplit.length / 4)
  console.log({ mirrorSplit })

  const readyToRender = new ImageData(
    Uint8ClampedArray.from(mirrorSplit),
    // newSize,
    // newSize
    pixels.width,
    pixels.height,
  )

  console.log({ readyToRender })
  return readyToRender
}

const WebCam = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const previewRef = useRef(null)

  const [ pixelState, updatePixelState ] = useState(null)
  const [ newPixels, setNewPixels ] = useState(null)

  useEffect (() => {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: videoWidth,
        height: videoWidth,
      },
    })
      .then(localMediaStream => {
        console.log(localMediaStream)
        videoRef.current.srcObject = localMediaStream
        videoRef.current.play()
        const ctx = canvasRef.current.getContext('2d')
        const previewCtx = previewRef.current.getContext('2d')
        let updateLoop = null

        setTimeout(() => {
          // console.log(videoRef.current.videoWidth)

          canvasRef.current.width = videoWidth
          canvasRef.current.height = videoWidth

          previewRef.current.width = videoWidth
          previewRef.current.height = videoWidth

          // console.log({ pixelState })

          updateLoop = setInterval(() => {
            ctx.drawImage(
              videoRef.current,
              0, 0,
              videoRef.current.videoWidth,
              videoRef.current.videoHeight
            )

            // setNewPixels()

            // console.log(Uint8ClampedArray.from([...ctx.getImageData(0, 0, videoWidth, videoWidth).data]))


            previewCtx.putImageData(
              groupPixels(ctx.getImageData(0, 0, videoWidth, videoWidth)),
              0,0,0,0,
              videoWidth,
              videoWidth,
            )

            if (pixelState) {
              console.log('new pixels!!', pixelState)
              // previewCtx.drawImage(
              //   '',
              //   0, 0,
              //   videoRef.current.videoWidth,
              //   videoRef.current.videoHeight
              // )

              
            } else {
              return
            }

            // get the pixels of the image
            // canvas width and height is available on this pixels object
            // Useful for dynamic sizing
            // const pixels = ctx.getImageData(0, 0, videoWidth, videoWidth)
            // updatePixelState(pixels)

          }, 32) // interval update
        }, 1000)

        setTimeout(() => {
          clearInterval(updateLoop)
        }, 10 * 1000)
      })
      .catch(err => {
        console.error('-- MEDIA STREAM ERROR --\n', err)
      })
  })

  return <div>
    <Preview ref={ previewRef } />
    <Canvas ref={ canvasRef } />
    <Video ref={ videoRef } />
    {/* <pre>
      pixels length: { pixelState?.length } | 
      grouped: { groupPixels(pixelState)?.length }
    </pre> */}
  </div>
}


export default WebCam
