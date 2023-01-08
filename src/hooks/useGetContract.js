import { useState, useEffect } from 'react'
import { ethers } from "ethers";
import { useAccount } from 'wagmi';


const useGetContract = (ca, abi) => {

    const [contract, setContract] = useState(null);
    const {address, isConnected} = useAccount()
    useEffect(() => {
        if(address){

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const singer = provider.getSigner();
            const _contract = new ethers.Contract(ca, abi, singer)
            setContract(_contract);
        }
    }, [])

    return contract
}

export default useGetContract