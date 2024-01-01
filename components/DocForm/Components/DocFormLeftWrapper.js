import styled from 'styled-components';
import { FormState } from '../DocForm';
import {useState} from 'react';
import { useContext } from 'react';

const DocFormLeftWrapper = () => {

    const Handler = useContext(FormState);

    // PatientId:"",
    // PatientName:"",
    // PatientAddress:"",
    // PatientSex:"",
    // PatientPhone:"",
    // PatientBirthDate:"",
    // PatientHeight:"",
    // PatientWeight:"",
    // PatientBloodGroup:"",


  return (
    <FormLeft>
        <FormInput>
            <label>Doctor ID</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.DocID} placeholder='Doc ID' name='DocID'></Input>
        </FormInput>
        <FormInput>
            <label>Doctor Name</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.DocName} placeholder='Doc Name' name='DocName'></Input>
        </FormInput>
       
        <FormInput>
            <label>Doctor Sex</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.DocSex} placeholder='Doc Sex' name='DocSex'></Input>
        </FormInput>
        <FormInput>
            <label>Doctor Phone</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.DocPhone} placeholder='Doc Phone' name='DocPhone'></Input>
        </FormInput>
        <FormInput>
            <label>Doctor BirthDate</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.DocBirthDate} placeholder='Doc BirthDate' name='DocBirthDate'></Input>
        </FormInput>
        <FormInput>
            <label>Doctor Qualification</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.DocQualification} placeholder='Doc Qualification' name='DocQualification'></Input>
        </FormInput>
        
        
    </FormLeft>
  )
}

const FormLeft = styled.div`
    width:48%;


`

const FormInput = styled.div`
    display:flex;
    flex-direction:column;
`

const Input = styled.input`
    padding:10px;
    margin-top:4px;
    border:none;
    font-size:large;

    

`

export default DocFormLeftWrapper