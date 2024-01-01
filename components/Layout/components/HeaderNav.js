
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const HeaderNav = () => {
    const Router = useRouter();
  return (
    <HeaderNavWrapper>
    <Link href={'/addPatient'}>
        <HeaderNavLinks active={Router.pathname == "/addPatient"? true : false}>
            Add Patient
        </HeaderNavLinks>
    </Link>
    <Link href="/patientList"><HeaderNavLinks active={Router.pathname == "/patientList"? true : false}>
        Find Patient
    </HeaderNavLinks></Link>
    <Link href="/addDoctor"><HeaderNavLinks active={Router.pathname == "/addDoctor"? true : false}> 
        Add Doctor
    </HeaderNavLinks></Link>
    <Link href="/grantAccess"><HeaderNavLinks active={Router.pathname == "/grantAccess"? true : false}>
        Grant Access to Doctor
    </HeaderNavLinks></Link>

    </HeaderNavWrapper>
  )
}

const HeaderNavWrapper = styled.div`
    display:  flex; 
    align-items : center;
    justify-content: space-between;
    padding: 6px;
    height: 50%;
    border-radius  : 10px

`
const HeaderNavLinks = styled.div`
    display:  flex; 
    align-items : center;
    justify-content: space-between;
    margin: 7px;
    height: 100%;
    border-radius  : 10px;
    padding: 0 4px 0 4px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    font-size: small;
    `

export default HeaderNav