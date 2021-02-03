import React, { useRef } from 'react'
import Styled from 'styled-components'
import PropTypes from 'prop-types'

// import FullResContext from '../context/fullres-context'
// ! NOT IN USE

const Canvas = Styled.canvas`
  display: none;
`

const DownloadWrapper = Styled.div`
  position: absolute;
  display: grid;
  justify-content: center;
  align-items: top;
  padding-top: 2rem;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,60,80, 0.8) 80%, rgba(0,0,0, 0));
  opacity: ${p => p.showOverlay ? 1 : 0};
  transition: all 300ms;
  transform: ${p => p.showOverlay
    ? `translateY(-25%)`
    : `translateY(100%)`
  };
  cursor: pointer;
`

const Downloader = props => {
  const {
    name,
    children,
    fullResData,
  } = props

  const canvasRef = useRef(null)

  const handleClick = () => {
    const { width, height, pixels } = fullResData
    canvasRef.current.width = width
    canvasRef.current.height = height
    const ctx = canvasRef.current.getContext('2d')

    ctx.putImageData(
      pixels[name],
      0,0,
      width,
      height
    )

    const dataUrl = canvasRef.current.toDataUrl('image/png')

    const a = document.createElement('a')
    a.setAttribute('download', `${name}-download.png`)
    a.setAttribute('href', dataUrl,)
    a.click()
  }

  return <div onClick={ handleClick }>
    <Canvas useRef={ canvasRef } />
    { children }
  </div>
}

Downloader.propTypes = {
  name: PropTypes.oneOf([ 'live', 'left', 'right' ]).isRequired
}


export default Downloader
