import React, { useState, useEffect } from 'react'

export default props => {
  const [ isRunning, setIsRunning ] = useState(false)
  const [ time, setTime ] = useState(0)

  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    }
    // returned function is used for cleanup
    return () => {
      clearInterval(interval)
    }

  }, [isRunning]) // will only run if isRunning changes value

  return {
    isRunning,
    setIsRunning,
    time,
    setTime,
  }
}
