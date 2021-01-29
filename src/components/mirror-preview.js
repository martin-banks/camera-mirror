import React from 'react'
import Styled from 'styled-components'
import PropTypes from 'prop-types'

import DownloadIcon from './icon-download'



const Preview = Styled.div`
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px -4px black;
  border-radius: 4px;
  background: black;
  transition: opacity 300ms;
  &:hover {
    [data-background] {
      opacity: ${p => p.showOverlay && 1};
    };
    [data-download] {
      transform: ${p => p.showOverlay && `translateY(-33%)`};
      opacity: ${p => p.showOverlay && 1};
    };
    [data-message] {
      transform: ${p => p.showOverlay && `translateY(100%)`};
    };
  };
`

const Background = Styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: solid 2px rgba(255, 255, 255, 1);
  border-radius: 4px;
  /* background: rgba(0, 200, 0, 0.5); */
  opacity: 0;
  transition: all 300ms;
  backdrop-filter: blur(4px);
  z-index: 0;
`

const DownloadWrapper = Styled.a`
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

const DownloadMessage = Styled.h4`
  position: absolute;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 2rem 0;
  transform: translateY(200%);
  transition: transform 500ms;
  color: #ffffff;
`

const MirrorPreview = props => {
  const {
    children,
    showOverlay,
    canvas,
    name,
  } = props


  return <Preview showOverlay={ showOverlay }>
    <div>
      <Background data-background></Background>
      <DownloadWrapper
        href={ canvas.current?.toDataURL('image/png') }
        data-download
        showOverlay={ showOverlay }
        download={ `${name}.png` }
      >
        <DownloadIcon data-icon size="40"/>
        <DownloadMessage data-message>Download image</DownloadMessage>
      </DownloadWrapper>
    </div>
    { children }
  </Preview>
}

MirrorPreview.defaultProps = {
  showOverlay: true,
  name: 'mirror-image'
}

MirrorPreview.propTypes = {
  showOverlay: PropTypes.bool,
  canvas: PropTypes.object.isRequired,
  name: PropTypes.string,
}

export default MirrorPreview
