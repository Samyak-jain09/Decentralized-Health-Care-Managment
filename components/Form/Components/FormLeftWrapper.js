import styled from 'styled-components';
import { FormState } from '../Form';
import {useState} from 'react';
import { useContext } from 'react';

const FormLeftWrapper = () => {

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
            <label>Patient ID</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.PatientId} placeholder='Patient ID' name='PatientId'></Input>
        </FormInput>
        <FormInput>
            <label>Patient Name</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.PatientName} placeholder='Patient Name' name='PatientName'></Input>
        </FormInput>
        <FormInput>
            <label>Patient Address</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.PatientAddress} placeholder='Patient Address' name='PatientAddress'></Input>
        </FormInput>
        <FormInput>
            <label>Patient Sex</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.PatientSex} placeholder='Patient Sex' name='PatientSex'></Input>
        </FormInput>
        <FormInput>
            <label>Patient Phone</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.PatientPhone} placeholder='Patient Phone' name='PatientPhone'></Input>
        </FormInput>
        <FormInput>
            <label>Patient BirthDate</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.PatientBirthDate} placeholder='Patient BirthDate' name='PatientBirthDate'></Input>
        </FormInput>
        <FormInput>
            <label>Patient Height</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.PatientHeight} placeholder='Patient Height' name='PatientHeight'></Input>
        </FormInput>
        <FormInput>
            <label>Patient Weight</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.PatientWeight} placeholder='Patient Weight' name='PatientWeight'></Input>
        </FormInput>
        <FormInput>
            <label>Patient BloodGroup</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.PatientBloodGroup} placeholder='Patient BloodGroup' name='PatientBloodGroup'></Input>
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

export default FormLeftWrapper