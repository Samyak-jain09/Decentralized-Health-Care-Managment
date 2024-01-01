'use client';
import styled from 'styled-components';
import PatientFormLeftWrapper from './Components/PatientFormLeftWrapper';
import PatientFormRightWrapper from './Components/PatientFormRightWrapper';
import { createContext, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import HealthDetails from '../../artifacts/contracts/Record.sol/HealthDetails.json';


const FormState = createContext();

const PatientForm = () => {
    const [form, setForm] = useState({
        PatientAddress: "",

    });
    const [loading, setLoading] = useState(false);
    const [patientData, setPatientData] = useState(null);

    const FormHandler = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const savePatientRecord = async (e) => {
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        if (form.PatientAddress == "") {
            alert("Feild Empty");
        }

        else {
            const patientAddressString = form.PatientAddress;
            const patientAddressSolidity = ethers.utils.getAddress(patientAddressString);
            setLoading(true);
                        
            try{
                const contract = new ethers.Contract(
                    process.env.NEXT_PUBLIC_ADDRESS,
                    HealthDetails.abi,
                    signer
    
                );
                console.log("Input success");
                const recordData = await contract.findPatient(
                    patientAddressSolidity,
                );
                
                setPatientData(recordData);
                // console.log("%s............",patientData);

            }
            catch(error){
                alert("You don't have permission to access the information");
            }
            finally{
                setLoading(false);
            }
            

            
            
        }
    }



  return (
    <FormState.Provider value={{ form, setForm, FormHandler, savePatientRecord }}>
            <FormWrapper>
                <FormMain>
                    {loading == true ?
                        (
                            <Spinner>
                                {/* <TailSpin height={60} /> */}
                                <ClipLoader color="#36d7b7" />
                            </Spinner> ):
                            patientData ? (
                            <Address>
                        
                                <h1>Successfully retrieved data</h1>
                                <p>ID: {patientData[0]}</p>
                                <p>Name: {patientData[1]}</p>
                                <p>Address: {patientData[2]}</p>
                                <p>Sex: {patientData[3]}</p>
                                <p>Phone Number: {patientData[4]}</p>
                                <p>Birth Date: {patientData[5]}</p>
                                <p>Height: {patientData[6]}</p>
                                <p>Weight: {patientData[7]}</p>
                                <p>Blood Group: {patientData[8]}</p>
                                
                            </Address>
                             ) :

                        <FormInputsWrapper>
                            <PatientFormLeftWrapper />
                            <PatientFormRightWrapper />
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
const FormMain = styled.div`
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
    font_weight:bold;
    

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

export default PatientForm;
export { FormState };