import React, { useEffect, useState } from "react";
import { useGetData } from "../hooks/useGetData";
import abi from "../contracts/PokemonCards.sol/PokemonCards.json"
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";


const UserContext = React.createContext({
    emptyValue:''
})

export const UserContextWrapper = (props) => {
    const ca = "0x356fe86D411BDE7Af842C14cAd1260E69aD63392"

    const [tokenUri, setTokenUri] = useState()
    const [userTokenId, setUserTokenId] = useState()
    const [totalTrades, setTotalTrades] = useState()
    const [creatorTokenUri, setCreatorUri] = useState()
    const [isLogged, setIsLogged] = useState(false);
    const [connectedAddr, setConnectedAddr] = useState()
    const {data, isLoading} = useGetData(tokenUri);
    const toast = useToast()
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
   

   


    const connect = async() => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const network = await provider.getNetwork();
            if (network.chainId !== 80001) {
              try {
                await window.ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: "0x13881",
                      rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
                      chainName: "Mumbai Testnet",
                      nativeCurrency: {
                        name: "MATIC",
                        symbol: "MATIC",
                        decimals: 18,
                      },
                      blockExplorerUrls: ["https://polygonscan.com/"],
                    },
                  ],
                });
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const addr = await provider.getSigner().getAddress()
                setConnectedAddr(addr)
                setIsLogged(true);
              
              } catch (err) {
                setIsLogged(false);
                toast({
                  title: err.message,
                  status: "error",
                });
              }
              setIsLogged(true);
            } else {
              await window.ethereum.request({ method: "eth_requestAccounts" });
              setIsLogged(true);
            
            }
          } catch (err) {
      
            setIsLogged(false);
            toast({
              title: err.message,
              status: "error",
            });
          }
        };
   
    const [trade, setTrade] = useState(false)
    const getUserTrade = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const signerAddr = await signer.getAddress()
        const contract = new ethers.Contract(ca, abi.abi, signer)

        const numberOfTrades = await contract.getAlltrades()
        console.log(numberOfTrades.toNumber())
        const array = [];
        for (let i = 0; i <= numberOfTrades.toNumber(); i++) {
            const element = await contract.trades(i);
            if(element.dealer == signerAddr || element.creator == signerAddr){
                setTrade(element)
                console.log(element)
             }
            
        }
       
    }

    const isConnected = async () => {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if(accounts.length) {
        console.log(`You're connected to: ${accounts[0]}`);
        setConnectedAddr(accounts[0])
        setIsLogged(true);
      } else {
        console.log("Wallet is not connected");
        setIsLogged(false);
      }
    };
  
 const web3Init = () => {

    getCaData()
    getUserNft()
    getUserTrade()
    isConnected()
    
 }
useEffect(() => {


web3Init()
    connect()
    isConnected()
},[])
    return(
        <UserContext.Provider value={{
            userToken:data,
            loading:isLoading,
            userTokenId:userTokenId,
            totalTrades:totalTrades,
            ca:ca,
            trade:trade,
            isConnected:isLogged,
            web3Init:web3Init,
            userAddr:connectedAddr
        }}>
            {props.children}
        </UserContext.Provider>
    )
}


export {UserContext};