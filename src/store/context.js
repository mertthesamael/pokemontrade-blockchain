import React, { useEffect, useState } from "react";
import { useGetData } from "../hooks/useGetData";
import abi from "../contracts/PokemonCards.sol/PokemonCards.json"
import { ethers, getDefaultProvider } from "ethers";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const UserContext = React.createContext({
    emptyValue:''
})

export const UserContextWrapper = (props) => {
    const ca = "0x1e550451Dea5981626462c528cD2F0e75664187C"

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
 const handleAccountChange = (...args) => {
  // you can console to see the args
  const accounts = args[0] ;
  // if no accounts that means we are not connected
  if (accounts.length === 0) {
    console.log("Please connect to metamask");
    // our old data is not current connected account
    // currentAccount account that you already fetched and assume you stored it in useState
  } else if (accounts[0] !== connectedAddr) {
    // if account changed you should update the currentAccount so you return the updated the data
    // assuming you have [currentAccount,setCurrentAccount]=useState
    // however you are tracking the state currentAccount, you have to update it. in case of redux you have to dispatch update action etc
    setConnectedAddr(accounts[0])
  }
};
 useEffect(() => {

  window.ethereum?.on("accountsChanged", handleAccountChange);

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