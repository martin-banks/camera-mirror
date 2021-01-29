import React, { useEffect } from "react"
// import { Link } from "gatsby"
import Styled from 'styled-components'

// import Image from "../components/image"
import SEO from "../components/seo"
import Logo from '../components/logo'

import timer from '../components/timer-hooks'





  
const TestPage = () => {
  // console.log('this is the timer', { timer })
  const {
    isRunning,
    // elapsedTime,
    // setElapsedTime,
    time,
    setTime,
    setIsRunning,
  } = timer();
  
  // useEffect(() => {
  //   // startTimer()
  //   // if (elapsedTime > 5) {
  //   //   stopTimer()
  //   // }

  // }, [isRunning])

  const handleClick = () => {
    if (isRunning) {
      setIsRunning(false)
    } else {
      // setElapsedTime(0)
      setIsRunning(true)
    }
  }
  return <>
    <SEO title="Home" />
    <Logo />
    <pre className="dump">{ Math.round(time) }</pre>
    <button onClick={ handleClick }>{
      isRunning ? 'Stop' : 'Start'
    }</button>
  </>
}

export default TestPage
