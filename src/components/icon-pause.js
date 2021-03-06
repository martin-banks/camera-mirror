import React from 'react'
import PropTypes from 'prop-types'

const Pause = props => {
  const { size, fill } = props

  return <svg
    width={ `${size}px` }
    height={ `${size}px` }
    viewBox="0 0 100 100"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xlinkHref="http://www.w3.org/1999/xlink"
  >
    <path
      d="M50,0 C77.6142375,0 100,22.3857625 100,50 C100,77.6142375 77.6142375,100 50,100 C22.3857625,100 0,77.6142375 0,50 C0,22.3857625 22.3857625,0 50,0 Z M50,3 C24.0426168,3 3,24.0426168 3,50 C3,75.9573832 24.0426168,97 50,97 C75.9573832,97 97,75.9573832 97,50 C97,24.0426168 75.9573832,3 50,3 Z M44,29 L44,71 L36,71 L36,29 L44,29 Z M64,29 L64,71 L56,71 L56,29 L64,29 Z"
      fill={ fill }
    ></path>
  </svg>
}

Pause.defaultProps = {
  size: 50,
  fill: '#FFFFFF'
}

Pause.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  fill: PropTypes.string,
}

export default Pause
