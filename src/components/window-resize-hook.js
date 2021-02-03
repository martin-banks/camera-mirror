import React, { useLayoutEffect, useState } from 'react'


const useWindowSize = () => {
  const [ size, setSize ] = useState([ 0, 0 ])

  let resizeWait = null

  function updateSize() {
    if (resizeWait) {
      clearTimeout(resizeWait)
    }
    resizeWait = setTimeout(() => {
      setSize([ window.innerWidth, window.innerHeight ])
    }, 50)
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}

export default useWindowSize
