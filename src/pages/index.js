import React from "react"
// import { Link } from "gatsby"
import Styled from 'styled-components'

// import Image from "../components/image"
import SEO from "../components/seo"
import WebCam from '../components/webcam'
import Logo from '../components/logo'


const IndexPage = () => (
  <>
    <SEO title="Home" />
    <Logo />
    <WebCam />
  </>
)

export default IndexPage
