'use client';
import styled from 'styled-components';
import AccessFormLeftWrapper from './Components/AccessFormLeftWrapper';
import AccessFormRightWrapper from './Components/AccessFormRightWrapper';
import { createContext, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import HealthDetails from '../../artifacts/contracts/Record.sol/HealthDetails.json';


const FormState = createContext();

const AccessForm = () => {
    const [form, setForm] = useState({
        DoctorAddress: "",

    });
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");

    const FormHandler = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const saveDocRecord = async (e) => {
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        if (form.DoctorAddress == "") {
            alert("Feild Empty");
        }

        else {
            const doctorAddressString = form.DoctorAddress;
            const doctorAddressSolidity = ethers.utils.getAddress(doctorAddressString);
            setLoading(true);
            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_ADDRESS,
                HealthDetails.abi,
                signer

            );

            console.log("Access Granted");
            const recordData = await contract.grant_Access(
                doctorAddressSolidity,
            );
            await recordData.wait();
            setAddress(recordData.to);
        }
    }
    return (
        
        <FormState.Provider value={{ form, setForm, FormHandler, saveDocRecord }}>
            <FormWrapper>
                <FormMain>
                    {loading == true ?
                        address == "" ?
                            <Spinner>
                                {/* <TailSpin height={60} /> */}
                                <ClipLoader color="#36d7b7" />
                            </Spinner> :
                            <Address>
                                <h1>Access Granted Successfully</h1>
                                <h1> {address}</h1>
                                
                            </Address>
                        :

                        <FormInputsWrapper>
                            <AccessFormLeftWrapper />
                            <AccessFormRightWrapper />
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

export default AccessForm;
export { FormState };