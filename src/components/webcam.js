import React, { useEffect, useRef, useState } from 'react'
import Styled from 'styled-components'
import PropTypes from 'prop-types'

import arrayMirror from '../functions/array-mirror'

import MirrorPreview from './mirror-preview'


const videoWidth = 400
const ratio = [ 400, 400 ]


function groupPixels (pixels) {
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

  const mirrored = arrayMirror({ ratio, data: output.data })

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


// ? Components

const Wrapper = Styled.div`
  margin-bottom: 20rem;
`
const VideoWrapper = Styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  justify-items: center;
  align-items: center;
`
const Canvas = Styled.canvas`
  width: 350px;
  height: 350px;
`
// This canvas is used to convert the video
// it is not intended to be seen
const CanvasStaging = Styled.canvas`
  display: none;
  width: 0;
  height: 0;
`
const Video = Styled.video`
  width: 400px; // ${p => videoWidth / 2}px;
  height: 400px; // ${p => videoWidth / 2}px;
  outline: solid 1px pink;
`


// ! Webcam app
const WebCam = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const previewRefLeft = useRef(null)
  const previewRefRight = useRef(null)

  useEffect (() => {
    return
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

        const videoTrack = localMediaStream.getVideoTracks()[0]
        const videoTrackCapabilities = videoTrack.getCapabilities()
        console.log({ videoTrack })

        videoRef.current.play()

        const ctx = canvasRef.current.getContext('2d')
        const previewCtxLeft = previewRefLeft.current.getContext('2d')
        const previewCtxRight = previewRefRight.current.getContext('2d')
        let updateLoop = null

        setTimeout(() => {
          canvasRef.current.width = videoWidth
          canvasRef.current.height = videoWidth

          previewRefLeft.current.width = videoWidth
          previewRefLeft.current.height = videoWidth

          previewRefRight.current.width = videoWidth
          previewRefRight.current.height = videoWidth

          updateLoop = setInterval(() => {
            ctx.drawImage(
              videoRef.current,
              0, 0,
              videoRef.current.videoWidth,
              videoRef.current.videoHeight
            )
            previewCtxLeft.putImageData(
              groupPixels(ctx.getImageData(0, 0, videoWidth, videoWidth)).left,
              0,0,0,0,
              videoWidth,
              videoWidth,
            )
            previewCtxRight.putImageData(
              groupPixels(ctx.getImageData(0, 0, videoWidth, videoWidth)).right,
              0,0,0,0,
              videoWidth,
              videoWidth,
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
        }, 10 * 1000)
      })
      .catch(err => {
        console.error('-- MEDIA STREAM ERROR --\n', err)
      })
  })

  return <Wrapper>
    <CanvasStaging ref={ canvasRef } />

    <VideoWrapper>
      <MirrorPreview>
        <Canvas ref={ previewRefLeft } />
      </MirrorPreview>

      <Video ref={ videoRef } />

      <MirrorPreview>
        <Canvas ref={ previewRefRight } />
      </MirrorPreview>
    </VideoWrapper>
    {/* <pre>
      pixels length: { pixelState?.length } | 
      grouped: { groupPixels(pixelState)?.length }
    </pre> */}
  </Wrapper>
}


export default WebCam
