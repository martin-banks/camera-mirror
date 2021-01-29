import React, { useEffect, useRef, useState } from 'react'
import Styled from 'styled-components'
import PropTypes from 'prop-types'

import captureFromWebcam from '../functions/capture-from-webcam'

import MirrorPreview from './mirror-preview'
import PlayIcon from './icon-play'
import timer from './timer-hooks'


const videoSize = {
  width: 400,
  height: 400,
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
  width: 400px; // ${p => videoSize.width / 2}px;
  height: 400px; // ${p => videoSize.height / 2}px;
  background: black;
`
const ControlsWrapper = Styled.section`
  display: grid;
  justify-content: center;
  padding: 6rem 0;
`
const Button = Styled.button`
  background: none;
  color: none;
  border: none;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  &:hover {
    svg path {
      fill: gold !important;
    }
  }
`

const CountdownWrapper = Styled.div`
  display: grid;
  justify-content: center;
`
const Countdown = Styled.span`
  font-size: 10rem;
  text-align: center;
  font-family: dharma-gothic-e, sans-serif;
`


// ! Webcam app
const WebCam = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const previewRefLeft = useRef(null)
  const previewRefRight = useRef(null)

  const [ cameraLive, setCameraLive ] = useState(false)
  const [ duration, setDuration ] = useState(5000)
  const [ showTimer, setShowTimer ] = useState(false)

  const {
    time,
    setTime,
    isRunning,
    setIsRunning,
  } = timer()

  useEffect (() => {
    if (cameraLive) {
      captureFromWebcam({ videoSize, videoRef, canvasRef, previewRefLeft, previewRefRight, duration, setCameraLive })
      // setIsRunning(false)
    }

    if ((duration / 1000) - time <= 0) {
      setIsRunning(false)
    }

  }, [time, isRunning])


  const handleButtonClick = () => {
    if (isRunning) {
      setIsRunning(false)
    } else {
      setTime(0)
      setIsRunning(true)
    }
  }

  return <Wrapper>
    <CanvasStaging ref={ canvasRef } />

    <VideoWrapper>
      <MirrorPreview showOverlay={ !isRunning }>
        <Canvas ref={ previewRefLeft } />
      </MirrorPreview>

      <Video ref={ videoRef } />

      <MirrorPreview showOverlay={ !isRunning }>
        <Canvas ref={ previewRefRight } />
      </MirrorPreview>
    </VideoWrapper>


    {/* <CountdownWrapper></CountdownWrapper> */}

    <ControlsWrapper>
      {
          isRunning
          ? <CountdownWrapper>
              <p>Image ready in ...</p>
              <Countdown>{ (duration / 1000) - time }</Countdown>
            </CountdownWrapper>
          : <Button onClick={ handleButtonClick }>
              <PlayIcon size={ 100 } fill="#ffffff" />
            </Button>
      }
    </ControlsWrapper>
    {/* <pre>
      pixels length: { pixelState?.length } | 
      grouped: { groupPixels(pixelState)?.length }
    </pre> */}
  </Wrapper>
}


export default WebCam
