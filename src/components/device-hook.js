import React, { useEffect, useState } from 'react'


const useDevice = () => {
  const [ device, setDevice ] = useState({ device: 'mobile' })

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)
    setDevice({ device: isMobile ? 'mobile' : 'desktop' })

    // return () => {}
  }, [])

  return device
}

export default useDevice
