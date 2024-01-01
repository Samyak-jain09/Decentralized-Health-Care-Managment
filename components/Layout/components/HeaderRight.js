import React from 'react'
import styled from 'styled-components';
import Wallet from './Wallet';
const HeaderRight = () => {
  return (
    <HeaderRightWrapper>
        <Wallet />
    </HeaderRightWrapper>
  )
}
const HeaderRightWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-right: 10px;
height: 60%;
`
export default HeaderRight