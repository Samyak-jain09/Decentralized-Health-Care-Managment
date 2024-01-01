'use client';
import styled from 'styled-components';
import FormLeftWrapper from './Components/FormLeftWrapper';
import FormRightWrapper from './Components/FormRightWrapper';
import { createContext,useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import {ethers} from 'ethers';
import {toast} from 'react-toastify';
import HealthDetails from '../../artifacts/contracts/Record.sol/HealthDetails.json';

const FormState = createContext();

const Form = () => {
  const [form,setForm] = useState({
    PatientId:"",
    PatientName:"",
    PatientAddress:"",
    PatientSex:"",
    PatientPhone:"",
    PatientBirthDate:"",
    PatientHeight:"",
    PatientWeight:"",
    PatientBloodGroup:"",

  });

  const [loading,setLoading] = useState(false);
  const [address, setAddress] = useState("");

  const FormHandler = (e) =>{

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const savePatientRecord = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    if(form.PatientId==""){
      alert("Feild Empty");
    }
    else if(form.PatientAddress==""){
      alert("Feild Empty");
    }
    else if(form.PatientBirthDate==""){
      alert("Feild Empty");
    }
    else if(form.PatientName==""){
      alert("Feild Empty");
    }
    else if(form.PatientSex==""){
      alert("Feild Empty");
    }
    else if(form.PatientWeight==""){
      alert("Feild Empty");
    }
    else if(form.PatientHeight==""){
      alert("Feild Empty");
    }
    else if(form.PatientBloodGroup==""){
      alert("Feild Empty");
    }
    else if(form.PatientPhone==""){
      alert("Feild Empty");
    }
    else{
      setLoading(true);
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        HealthDetails.abi,
        signer

      );

      console.log("Saving Record Details");
      const recordData = await contract.setPatient(
        form.PatientId,
        form.PatientName,
        form.PatientAddress,
        form.PatientSex,
        form.PatientPhone,
        form.PatientBirthDate,
        form.PatientHeight,
        form.PatientWeight,
        form.PatientBloodGroup
      );
      await recordData.wait();
      setAddress(recordData.to);
    }

  }

  return (
    <FormState.Provider value={{form,setForm,FormHandler, savePatientRecord}}>
    <FormWrapper>
      <FormMain>
        {loading == true ?
            address == ""?
                <Spinner>
                    {/* <TailSpin height={60} /> */}
                    <ClipLoader color="#36d7b7" />
                </Spinner> :
            <Address>
                <h1>Information Saved Successfully at address {address}</h1>
                    <p>Patient ID - {form.PatientId}</p>
                    <p>Patient Name - {form.PatientName}</p>
                    <p>Patient Address - {form.PatientAddress}</p>
                    <p>Patient Sex - {form.PatientSex}</p>
                    <p>Patient Phone Number -{form.PatientPhone}</p>
                    <p>Patient Birth Date - {form.PatientBirthDate}</p>
                    <p>Patient Height - {form.PatientHeight}</p>
                    <p>Patient Weight - {form.PatientWeight}</p>
                    <p>Patient Blood Group - {form.PatientBloodGroup}</p>
                    
                
            </Address>
            :
           
              <FormInputsWrapper>
                  <FormLeftWrapper />
                  <FormRightWrapper />
              </FormInputsWrapper>
        }
      </FormMain>
    </FormWrapper>
    </FormState.Provider>
  )
}
const FormWrapper = styled.div`
  width: 100;
  display:flex ;
  justify-content: center;
`
const FormMain  =styled.div `
  width: 80%;
`

const FormInputsWrapper = styled.div`
  display:flex;
  justify-content:space-between;
  margin-top:45px;
`

const Spinner = styled.div`
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;

`
const Address = styled.div`
    width:100%;
    height:80vh;
    display:flex;
    flex-direction:column;
    align-items:center;

`

const Button = styled.button`
  display: flex;
  justify-content:center;
  width:30%;
  padding:15px;
  color:white;
  background-color:#00b712;
  border:none;
  margin-top:30px;
  cursor:pointer;
  font_weight:bold;
  font_size:large;

`
export default Form;
export {FormState};