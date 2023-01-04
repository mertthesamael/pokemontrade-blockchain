import React, { useEffect, useState } from "react";
import { useGetData } from "../hooks/useGetData";
import abi from "../contracts/PokemonCards.sol/PokemonCards.json"
import { ethers } from "ethers";

const UserContext = React.createContext({
    emptyValue:''
})

export const UserContextWrapper = (props) => {
    const [tokenUri, setTokenUri] = useState()
    const [userTokenId, setUserTokenId] = useState()
    const [totalTrades, setTotalTrades] = useState()
    const [creatorTokenUri, setCreatorUri] = useState()
    const {data, isLoading} = useGetData(tokenUri);
    const ca = "0x410Ba3C8F97f8CB4E5147d73239FFeeB34be834f"
    const getUserNft = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const signerAddr = signer.getAddress()
        const contract = new ethers.Contract(ca, abi.abi, signer)
        const nfts = await contract.getAll(signerAddr)
        const tokenUri = await contract.tokenURI(nfts[nfts.length-1].toNumber())
        setTokenUri(tokenUri)
        setUserTokenId(nfts[nfts.length-1].toNumber())
    }



    const getCaData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(ca, abi.abi, signer)
        const allTrades = await contract.totalTrades();
        
       
        let emptyArr = []
        for(let i = 1; i<=allTrades.toNumber();i++){
            let index = await contract.trades(i)
            emptyArr.push(index)
        }
        setTotalTrades(emptyArr)
    }
   

useEffect(() => {
    getUserNft()
    getCaData()
},[])
    return(
        <UserContext.Provider value={{
            userToken:data,
            loading:isLoading,
            userTokenId:userTokenId,
            totalTrades:totalTrades,
            ca:ca,
           
        }}>
            {props.children}
        </UserContext.Provider>
    )
}


export {UserContext};