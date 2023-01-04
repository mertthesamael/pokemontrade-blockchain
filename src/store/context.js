import React, { useEffect, useState } from "react";
import { useGetData } from "../hooks/useGetData";
import abi from "../contracts/PokemonCards.sol/PokemonCards.json"
import { ethers } from "ethers";

const UserContext = React.createContext({
    emptyValue:''
})

export const UserContextWrapper = (props) => {
    const [tokenUri, setTokenUri] = useState()
   

    const {data, isLoading} = useGetData(tokenUri);
    const getUserNft = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const signerAddr = signer.getAddress()
        const contract = new ethers.Contract("0xAd9DAC734E5895AC35eDBE842C19130f4B4Ce435", abi.abi, signer)
        const nfts = await contract.getAll(signerAddr)
        const tokenUri = await contract.tokenURI(nfts[nfts.length-1].toNumber())
        setTokenUri(tokenUri)
        
    }
    
   

useEffect(() => {
    getUserNft()
},[])
    return(
        <UserContext.Provider value={{
            userToken:data,
            loading:isLoading,
           
        }}>
            {props.children}
        </UserContext.Provider>
    )
}


export {UserContext};