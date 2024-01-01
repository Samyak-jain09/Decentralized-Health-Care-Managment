import styled from 'styled-components';
import { ethers } from 'ethers';
import { useState } from 'react';
import { Seymour_One } from 'next/font/google';
const networks = {
    polygon: {
        chainId: `0x${Number(80001).toString(16)}`,
        chainName: "Polygon Testnet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
    },
};

const Wallet = () => {
    const [address,setAddress] = useState('');
    const [balance,setbalance] = useState('');
    const connectWallet = async()=>{
        await window.ethereum.request({method:"eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum,"any");
        if(provider.network !== "matic")
            await window.ethereum.request({
                method:"wallet_addEthereumChain",
                params: [
                    {
                    ...networks["polygon"]
                }
            ]
            })
        const account = provider.getSigner();
        const Address = await account.getAddress();
        setAddress(Address);
        const Balance = ethers.utils.formatEther(await account.getBalance());
        setbalance(Balance);

    }
    return (
        <ConnectWallerWrapper onClick={connectWallet}>Connect Wallet</ConnectWallerWrapper>
    )
}

const ConnectWallerWrapper = styled.div`
    display: flex;
    align-items: content;
    justify-content: center;
    height: 100%;
    padding: 5px 9px;
    margin-right: 15px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;

`
export default Wallet