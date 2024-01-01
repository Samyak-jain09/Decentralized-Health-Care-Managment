import styled from 'styled-components';
import { FormState } from '../DocForm';

import {useContext} from 'react';
 
const DocFormRightWrapper = () => {
    const Handler = useContext(FormState);

    
  return (
    <FormRight>
        <Button onClick={Handler.saveDocRecord}>
            Save Doctor Record
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

export default DocFormRightWrapper