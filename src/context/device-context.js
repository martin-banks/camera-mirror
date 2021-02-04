import React from 'react'

const isMobile = null // /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)
const DeviceContext = React.createContext({ device: isMobile ? 'mobile' : 'desktop' })

export default DeviceContext

