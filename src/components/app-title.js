import React from 'react'
import Styled from 'styled-components'


const Wrapper = Styled.section`
  position: relative;
  display: grid;
  justify-content: center;
  width: 80vw;
  max-width: 700px;
  margin: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 4rem;
  
`
const Title = Styled.h1`
  text-align: center;
`
const Intro = Styled.p`
  text-align: center;
  font-size: 2.5rem;
`

const AppTitle = () => {

return <Wrapper>
  {/* <Title>page title</Title> */}
  <Intro>Ever wondered what you would look like if your face was perfectly symetrical? Now you can! Hit the button, line your face up in the middle to find out.</Intro>
  <Intro>Have fun! </Intro>
</Wrapper>
}

export default AppTitle
