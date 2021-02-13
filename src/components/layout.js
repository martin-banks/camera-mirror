/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"
import Styled from 'styled-components'

// import ThemeContext from '../context/theme-context'

import Header from "./header"
import TriangleBackground from '../components/triangle-background'
import Footer from './footer'

import useWindowSize from './window-resize-hook'



const Page = Styled.div`
  display: block;
  position: relative;
  width: 100%;
  overflow: hidden;
`

const LayoutWrapper = Styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  position: relative;
  padding-top: 16rem;
  z-index: 100;
`

const Main = Styled.main`
  display: block;
  box-sizing: border-box;
`


const Layout = ({ children }) => {
  const [ windowWidth, windowHeight ] = useWindowSize()

  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)


  return (
    <Page>
      {/* <ThemeContext.Consumer> */}
        {/* { c => <BackgroundGrid theme={ c.theme } /> } */}
      {/* </ThemeContext.Consumer> */}
      <TriangleBackground
        hyp={ Math.max(Math.floor(windowWidth / 80), 80) }
        ratio={ [1, 1] }
        fillEdges={ true }
        gradientColors={
          [{ color: 'rgba(100,100,100, 0.2)', offset: '0' }]
          // [
          //   { color: 'firebrick', offset: '0' },
          //   { color: 'orange', offset: '0.5' },
          //   { color: 'gold', offset: '1' },
          // ]
        }
        hideThreshold={ 0.8 }
      />
      <LayoutWrapper data-layer-wrapper>
        <Header />
        <Main>{ children }</Main>
        <Footer />
      </LayoutWrapper>
    </Page>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
