import styled from 'styled-components';
import Link from 'next/link';

const HeadereLogo = () => {
  return (
    <Logo><Link href={'/'}>
      MediBloc
    </Link></Logo>

  )
}

const Logo = styled.h1`
    font-weight: bold;
    font-size: l20px;
    margin-Left:10px;

    `

export default HeadereLogo