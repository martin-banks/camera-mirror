import React, { useEffect, useRef, useState, useContext } from 'react'
import Styled, { keyframes, css } from 'styled-components'

import captureFromWebcam from '../functions/capture-from-webcam'
import storeFullResImage from '../functions/save-fullres-image'

import useDevice from './device-hook'
// import fullResContext from '../context/fullres-context'

import MirrorPreview from './mirror-preview'
import PlayIcon from './icon-play'
import timer from './timer-hooks'

import useWindowSize from './window-resize-hook'



// const minVideoSize = 200
const previewGridGap = 16

const videoSize = {
  width: 640, // Math.max((windowWidth / 3) - (previewGridGap * 2), minVideoSize),
  height: 480, // Math.max((windowWidth / 3) - (previewGridGap * 2), minVideoSize),
}
const previewSize = {
  width: 350, // Math.max((windowWidth / 3) - (previewGridGap * 2), minVideoSize),
  height: 260, // Math.max((windowWidth / 3) - (previewGridGap * 2), minVideoSize),
}

const previewCommonStyles = css`
  width: ${p => previewSize.width}px;
  /* height: ${p => previewSize.height}px; */
`


// ? Components

const Wrapper = Styled.div`
  margin-bottom: 20rem;
`

const PreviewWrapper = Styled.div`
  display: ${p => p.windowWidth >= previewSize.width * 3 ? 'grid' : 'block'};
  grid-template-columns: repeat(auto-fill, minmax(${previewSize.width}px, 1fr));
  justify-items: center;
  align-items: center;
  width: ${p => p.windowWidth >= previewSize.width * 3 ? '100vw' : `${previewSize.width}px`};
  max-width: ${(previewSize.width * 3) + (previewGridGap * 2)}px;
  margin: 0 auto;
`
const Canvas = Styled.canvas`
  ${previewCommonStyles};
`
// This canvas is used to convert the video
// it is not intended to be seen
const CanvasStaging = Styled.canvas`
  display: none;
  width: ${previewSize.width};
  height: ${previewSize.height};
  pointer-events: none;
`
const Video = Styled.video`
  ${previewCommonStyles};
  background: black;
  width: ${previewSize.width}px;
  height: ${previewSize.height}px;
`
// const HiresVideo = Styled.video`
//   width: 1280px;
//   height: 720px;
//   background: grey;
// `

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
      fill: tomato;
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
const VideoWrapper = Styled.div`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  background: black;
  * {
    margin: 0;
  }
`
const Live = Styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  left: 50%;
  transform: translate(-50%, -150%);
  padding: 4px 12px;
  border: solid 1px white;
  border-radius: 100px;
  background: black;
  @media screen and (prefers-color-scheme: dark) {
    background: white;
  }
`

const pulse = keyframes`
  0% {
    opacity: 1
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1
  }
`
const LiveMarker = Styled.div`
  border-radius: 100px;
  background: indianred;
  width: 16px;
  height: 16px;
  margin-right: 1rem;
  display: inline-block;
  animation: 1.5s ${pulse} infinite ease-in-out;
  transform: scale(1.2);
`
const LiveText = Styled.p`
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
  color: white;
  @media screen and (prefers-color-scheme: dark) {
    color: black;
  }
`
const CenterLine = Styled.span`
  position: absolute;
  left: 50%;
  top: 0;
  height: 100%;
  width: 0;
  border-left: dotted 4px red;
`


// ! Webcam app
const WebCam = () => {
  const videoRef = useRef(null)
  const hiddenVideoRef = useRef(null)
  const canvasRef = useRef(null)
  const fullResRef = useRef(null)
  const previewRefLeft = useRef(null)
  const previewRefRight = useRef(null)

  const [ cameraLive, setCameraLive ] = useState(false)
  const [ duration, setDuration ] = useState(5000)
  // const [ showTimer, setShowTimer ] = useState(false)
  const [ hasRun, setHasRun ] = useState(false)
  const [ fullResData, storeFullRes ] = useState(null)

  const [ windowWidth, windowHeight ] = useWindowSize()
  const device = useDevice().device



  const {
    time,
    setTime,
    isRunning,
    setIsRunning,
  } = timer()

  useEffect (() => {
    if ((time * 1000) >= duration) {
      setIsRunning(false)
      setCameraLive(false)
    }

  }, [time, isRunning, cameraLive])

  const handleButtonClick = () => {
    if (isRunning) {
      setIsRunning(false)
    } else {
      setTime(0)
      setIsRunning(true)
      setHasRun(true)
      setCameraLive(true)
      captureFromWebcam({
        videoSize,
        videoRef,
        canvasRef,
        previewRefLeft,
        previewRefRight,
        fullResRef,
        duration,
        setCameraLive,
      })


      // ! NOT IN USE
      // ! This has has been parked for this version due to the way chrome handles web-cam use
      // ! The purpose of this project is about mirroring the image not to get maximum web-cam images

      // setTimeout(() => {
      //   try {
      //     storeFullResImage({
      //       videoSize,
      //       // videoRef,
      //       hiddenVideoRef,
      //       canvasRef,
      //       previewRefLeft,
      //       previewRefRight,
      //       fullResRef,
      //       duration: duration,
      //       setCameraLive,
      //     })
      //       .then(storeFullRes)
      //   } catch (error) {
      //     console.error('-- ERROR CREATING FULL IMAGE --\n', error)
      //     console.trace(error)
      //   }
      // // }, duration / 2)
      // }, 0)
    }
  }



  return <Wrapper>
    <CanvasStaging ref={ canvasRef } />
    {/* <HiresVideo ref={ hiddenVideoRef } /> */}
    {/* <Canvas ref={ fullResRef } /> */}

    {/* <DeviceContext.Consumer> */}
      { device === 'mobile' &&
        <ControlsWrapper>{
          isRunning
          ? <CountdownWrapper>
              <p>Image ready in ...</p>
              <Countdown>{ (duration / 1000) - time }</Countdown>
            </CountdownWrapper>
          : <Button onClick={ handleButtonClick }>
              <PlayIcon size={ 100 } fill="#ffffff" />
            </Button>
        }</ControlsWrapper>
      }
    {/* </DeviceContext.Consumer> */}

    <PreviewWrapper windowWidth={ windowWidth }>
      {
        windowWidth < (previewSize.width * 3) &&
          <VideoWrapper>
            <Video ref={ videoRef } />
            { isRunning && <CenterLine /> }
            { isRunning &&
                <Live>
                  <LiveMarker />
                  <LiveText>Recording</LiveText>
                </Live>
            }
          </VideoWrapper>
      }
      {/* {
        windowWidth < (previewSize.width * 3) &&
          <MirrorPreview
            showOverlay={ !isRunning && hasRun }
            canvas={ canvasRef }
            fullResData={ fullResData }
            name="live"
          >
            <Video ref={ videoRef } />
            <CanvasStaging ref={ canvasRef } />
            { isRunning && <CenterLine /> }
            {
              isRunning &&
                <Live>
                  <LiveMarker />
                  <LiveText>Recording</LiveText>
                </Live>
            }
          </MirrorPreview>
      } */}


      <MirrorPreview
        showOverlay={ !isRunning && hasRun }
        canvas={ previewRefLeft }
        fullResData={ fullResData }
        name="left"
        size={ previewSize }
      >
        <Canvas ref={ previewRefLeft } />
      </MirrorPreview>

      {/* {
        windowWidth >= (previewSize.width * 3) &&
          <MirrorPreview
            showOverlay={ !isRunning && hasRun }
            canvas={ canvasRef }
            fullResData={ fullResData }
            name="live"
            size={ previewSize }
          >
            <Video ref={ videoRef } />
            <CanvasStaging ref={ canvasRef } />
            { isRunning && <CenterLine /> }
            {
              isRunning &&
                <Live>
                  <LiveMarker />
                  <LiveText>Recording</LiveText>
                </Live>
            }
          </MirrorPreview>
      } */}

      {
        windowWidth >= (previewSize.width * 3) &&
          <VideoWrapper>
            <Video ref={ videoRef } />
            { isRunning && <CenterLine /> }
            { isRunning &&
                <Live>
                  <LiveMarker />
                  <LiveText>Recording</LiveText>
                </Live>
            }
          </VideoWrapper>
      }


      <MirrorPreview
        showOverlay={ !isRunning && hasRun }
        canvas={ previewRefRight }
        fullResData={ fullResData }
        name="right"
        size={ previewSize }
      >
        <Canvas ref={ previewRefRight } />
      </MirrorPreview>
    </PreviewWrapper>


    {/* <DeviceContext.Consumer> */}
      { device === 'desktop' &&
        <ControlsWrapper>{
          isRunning
          ? <CountdownWrapper>
              <p>Image ready in ...</p>
              <Countdown>{ (duration / 1000) - time }</Countdown>
            </CountdownWrapper>
          : <Button onClick={ handleButtonClick }>
              <PlayIcon size={ 100 } fill="#ffffff" />
            </Button>
        }</ControlsWrapper>
      }
    {/* </DeviceContext.Consumer> */}

    {/* <pre>
      pixels length: { pixelState?.length } | 
      grouped: { groupPixels(pixelState)?.length }
    </pre> */}
  </Wrapper>
}


export default WebCam
