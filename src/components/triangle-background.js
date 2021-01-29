import React, { useState, useEffect, useContext } from 'react'
import Styled from 'styled-components'

// import AppContext from '../context'

const SVG = Styled.svg`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
`
// * Each triangle has it's own opacity value
// * to create a more textured effect
const maskOpacity = () => Math.min(Math.random() + 0.1, 0.7)



export default props => {
  // const context = useContext(AppContext)

  const {
    name = 'default',
    // * Horizintal "size" of the triangle
    hyp = 50,
    // * How many triangles per row.
    // * This allows for the triangles that clip off at either side
    fillEdges = false,
    // * Which direction should the triangles fade away to?
    fadeDown = false,
    // * Ratio of the viewbox
    // TODO -> This could be done better?
    ratio = [1, 0.5],
    // TODO -> better default colors?
    // TODO -> calculate the offsets here; props should only be the color values
    gradientColors = [
      { color: 'black', offset: '0' },
      { color: 'darkred', offset: '1' },
    ],
    gradientDirection = {
      x1: 0,
      x2: 0,
      y1: 1,
      y2: 0,
    },
    width = null,
    height = null,
    hideThreshold = 0.7
  } = props

  const [ rowCount, setRowCount ] = useState(10)
  const [ viewBox, setViewBox ] = useState([ 1000, 1000 ])
  const [ trianglesPerRow, setTrianglesPerRow ] = useState(50)

  const [ windowWidth, setWindowWidth ] = useState(window.innerWidth)
  const [ windowHeight, setWindowHeight ] = useState(window.innerHeight)

  // const [ windowWidth, updateWindowWidth ] = useState(context.windowWidth.get)
  // const [ windowHeight, updateWindowHeight ] = useState(context.windowHeight.get)

  // TODO -> Add window resize listener to rescale pattern to update size if using window size
  useEffect(() => {
    // setWindowWidth(window.innerWidth)
    // setWindowHeight(window.innerHeight)
    setRowCount(Math.ceil(windowHeight / 50))
    setViewBox([
      windowWidth,
      windowHeight,
    ])
    setTrianglesPerRow((Math.ceil(windowWidth / hyp) * (2 * ratio[0])) + (fillEdges ? 2 : 0))
  }, [])

  function createRow (rowIndex) {
    const progress = (fadeDown ? (rowCount - rowIndex) : rowIndex) / rowCount
    const reduction = (progress) * (hyp * 0.45)

    // * Calcualate the coords for each point of the triangle
    // * Points here start from teh top-left most point and proceed clockwise
    // TODO -> Clean this up!
    const firstPoints = [...new Array(trianglesPerRow)]
      .map((x, i) => [
        (Math.floor(i / 2) * hyp) - ((hyp / 2) * (rowIndex % 2)) + (!(i % 2) ? 0 : reduction), // scale -> even: 0 || odd: +
        (hyp * (rowIndex)) + (reduction) // scale -> even: + || odd: +
      ])

    const secondPoints = [... new Array(trianglesPerRow)]
      .map((x, i) => [
        (((i + 1) * (hyp / 2)) - ((hyp / 2) * (rowIndex % 2))) + (!(i % 2) ? (-1 * reduction) : (-1 * reduction)), // scale even: - || odd: -
        (((((i + 1) % 2) * hyp)) + (hyp * (rowIndex))) + (!(i % 2) ? (-1 * reduction) : reduction) // scale even: - || odd: +
      ])

    const thirdPoints = [... new Array(trianglesPerRow)]
      .map((x, i) => [
        (((Math.floor((i + 1) / 2) * hyp) - (hyp / 2)) - ((hyp / 2) * (rowIndex % 2))) + (!(i % 2) ? reduction : 0), // scale even: + || odd: 0
        (hyp * ((rowIndex) + 1)) + (!(i % 2) ? (-1 * reduction) : (-1 * reduction)) // scale even: + || odd: -
      ])

    // Creates each triangle polygon
    const polygons = [... new Array(trianglesPerRow)]
      .map((x, i) => [firstPoints[i], secondPoints[i], thirdPoints[i]])
      .filter((x, i) => ((Math.random() - progress) + 0.8) > hideThreshold)
      .filter((x, i, a) => ((!fillEdges) && (x[0][0] < 0 || x[1][0] < 0 || x[2][0] < 0)) ? false : true)
      .map((x, i) => <polygon
        key={ `triangle-polygon-${name}-${i}}` }
        points={`${x[0].join(',')} ${x[1].join(',')} ${x[2].join(',')}`}
        style={{ fill: `rgba(255,255,255, ${maskOpacity()})` }}/>
      )
    return polygons
  }

  const multirowPolygon = [... new Array(rowCount)]
    .map((x, i) => createRow(i))


  // console.log({ multirowPolygon })


  return (
    <SVG
      width={ `${windowWidth}px` }
      height={ `${windowHeight}px` }
      left="0"
      top="0"
      viewBox={`0 0 ${windowWidth} ${windowHeight}`}
      version="1.1"
    >
      <defs>
        <linearGradient
          id={ `${name}-gradient` }
          x1={ gradientDirection.x1 }
          x2={ gradientDirection.x2 }
          y1={ gradientDirection.y1 }
          y2={ gradientDirection.y2 }
        >
          {
            gradientColors.map((g, i) => (
              <stop key={ `triangle-gradient-stop-${name}-${i}` } offset={g.offset} stopColor={g.color} />
            ))
          }
        </linearGradient>
        <mask id={ `${name}-holeMask` }>{ multirowPolygon }</mask>
      </defs>
      <rect
        width={ `${viewBox[0]}px` }
        height={ `${viewBox[1]}px` }
        mask={ `url(#${name}-holeMask)` }
        fill={ `url(#${name}-gradient)` }
      />
    </SVG>
  )
}
