import React, { useEffect } from "react"
// import { Link } from "gatsby"
import Styled from 'styled-components'

// import Image from "../components/image"
import SEO from "../components/seo"
import Logo from '../components/logo'

// import timer from '../components/timer-hooks'
import useWindowSize from '../components/window-resize-hook'



const Box = Styled.div`
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  outline: solid 2px red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

`


const TestPage = () => {
  const [ width, height ] = useWindowSize()
  // console.log('this is the timer', { timer })
  // const {
  //   isRunning,
  //   // elapsedTime,
  //   // setElapsedTime,
  //   time,
  //   setTime,
  //   setIsRunning,
  // } = timer();
  
  // useEffect(() => {
  //   // startTimer()
  //   // if (elapsedTime > 5) {
  //   //   stopTimer()
  //   // }

  // }, [isRunning])

  // const handleClick = () => {
  //   if (isRunning) {
  //     setIsRunning(false)
  //   } else {
  //     // setElapsedTime(0)
  //     setIsRunning(true)
  //   }
  // }
  return <>
    <SEO title="Test page" />
    <Logo />
    {/* <pre className="dump">{ Math.round(time) }</pre> */}
    {/* <button onClick={ handleClick }>{
      isRunning ? 'Stop' : 'Start'
    }</button> */}


    <Box width={ width / 4 } height={ height / 4 } />



    {/* <WindowSize /> */}
  </>
}

export default TestPage
