import React from 'react'


const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

const DeviceContext = React.createContext({ device: isMobile ? 'mobile' : 'desktop' })

export default DeviceContext

