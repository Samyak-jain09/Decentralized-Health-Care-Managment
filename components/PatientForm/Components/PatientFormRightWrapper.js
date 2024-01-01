import styled from 'styled-components';
import { FormState } from '../PatientForm';
import {useContext} from 'react';

const PatientFormRightWrapper = () => {
    const Handler = useContext(FormState);

    
    return (
      <FormRight>
          <Button onClick={Handler.savePatientRecord}>
               Retrieve Patient Details
          </Button>
      </FormRight>
    )
}

const FormRight = styled.div`
width:48%;

`

const Button = styled.button`
width = 100%;
padding:15px;
color:white;
background-color:#00b712;
margin-top:30px;
cursor:pointer;
font-size:large;
font-weight:bold;

`

export default PatientFormRightWrapper