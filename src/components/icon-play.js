import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'


const Path = Styled.path`
  fill: #000;
  @media screen and (prefers-color-scheme: dark) {
    fill: white;
  }
`

const Play = props => {
  const { size, fill } = props

  return <svg
    width={ `${size}px` }
    viewBox="0 0 100 100"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xlinkHref="http://www.w3.org/1999/xlink"
  >
    <Path
      d="M50,0 C77.6142375,0 100,22.3857625 100,50 C100,77.6142375 77.6142375,100 50,100 C22.3857625,100 0,77.6142375 0,50 C0,22.3857625 22.3857625,0 50,0 Z M50,3 C24.0426168,3 3,24.0426168 3,50 C3,75.9573832 24.0426168,97 50,97 C75.9573832,97 97,75.9573832 97,50 C97,24.0426168 75.9573832,3 50,3 Z M39,30.2631579 L69,50 L39,69.7368421 L39,30.2631579 Z" 
    ></Path>
  </svg>
}

Play.defaultProps = {
  size: 50,
  fill: '#FFFFFF'
}

Play.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  fill: PropTypes.string,
}

export default Play
