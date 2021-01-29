import React from 'react'
import Styled from 'styled-components'


const Wrapper = Styled.section`
  display: grid;
  justify-content: center;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 4rem;
  
`
const Title = Styled.h1`
  text-align: center;
`
const Intro = Styled.p`
  text-align: center;
`

const AppTitle = () => {

return <Wrapper>
  <Title>page title</Title>
  <Intro>Minim ad sit ut ipsum id. Pariatur duis non ea velit do. Reprehenderit in fugiat ullamco labore. Minim in proident eu incididunt ullamco non labore amet.</Intro>
</Wrapper>
}

export default AppTitle
