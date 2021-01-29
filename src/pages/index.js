import React from "react"
// import { Link } from "gatsby"
import Styled from 'styled-components'

// import Image from "../components/image"
import SEO from "../components/seo"
import WebCam from '../components/webcam'
import Logo from '../components/logo'
import AppTitle from '../components/app-title'


const IndexPage = () => (
  <>
    <SEO title="Home" />
    <Logo />
    <AppTitle/>
    <WebCam />
  </>
)

export default IndexPage
