import React, { useEffect, useState } from "react";
import { useGetData } from "../hooks/useGetData";
import abi from "../contracts/PokemonCards.sol/PokemonCards.json";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";
import { useAccount } from "wagmi";

const UserContext = React.createContext({
  emptyValue: "",
});

export const UserContextWrapper = (props) => {
  const ca = "0xb8ACE684Cb0290fe5F42B602fe01B238dfF804F7";
  const [tokenUri, setTokenUri] = useState();
  const [userTokenId, setUserTokenId] = useState(0);
  const [totalTrades, setTotalTrades] = useState();
  const { data, isLoading } = useGetData(tokenUri);
  const [isTrading, setIsTrading] = useState()
  const [loading, setLoading] = useState()

  const {address, isConnected} = useAccount()
  const toast = useToast();
  const [theme, setTheme] = useState({
    navbarColor: 'darkblue',
    mainBackground:'#16213E',
    neumorph: {background: "#16213E",
    boxShadow: "19px 19px 37px #131c35, -19px -19px 37px #192647"},
  })

  const bgColors = {
    Charmander: "#EA5C2B",
    Bulbasaur: "#3C6255",
    Squirtle: "#064663",
    Pikachu: "#E5BA73",
  };
 
const colors = {
    Charmander: "#AE431E",
    Bulbasaur: "#285430",
    Squirtle: "#263159",
    Pikachu: "#C58940",
  };

  const neumorph = {
    Pikachu: {
      background: "#E5BA73",
      boxShadow: "19px 19px 37px #c39e62, -19px -19px 37px #ffd684",
    },
    Charmander: {
      background: "#EA5C2B",
      boxShadow: "19px 19px 37px #c74e25, -19px -19px 37px #ff6a31",
    },
    Bulbasaur: {
      background: "#3C6255",
      boxShadow: "19px 19px 37px #335348, -19px -19px 37px #457162",
    },
    Squirtle: {
      background: "#064663",
      boxShadow: "19px 19px 37px #053c54, -19px -19px 37px #075172",
    },
  };  
  const getIsTrading = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer =  provider.getSigner();
    const signerAddr = await signer.getAddress()
    const contract = new ethers.Contract(ca, abi.abi, signer);
    const data = await contract.isTrading(signerAddr);
    if(data){
      setIsTrading(true)
    }else{
      setIsTrading(false)
    }
  }

  const getUserNft = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddr = signer.getAddress();
    const contract = new ethers.Contract(ca, abi.abi, signer);
    try{
      const nfts = await contract.getAll(signerAddr);
      const tokenUri = await contract.tokenURI(nfts[nfts.length - 1].toNumber());
      setTokenUri(tokenUri);
      setUserTokenId(nfts[nfts.length - 1].toNumber());
    
    }catch(err){
      setTokenUri('');
      setUserTokenId('');
    }
  };

  const getCaData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ca, abi.abi, signer);
    const allTrades = await contract.totalTrades();
    let emptyArr = [];
    for (let i = 1; i <= allTrades.toNumber(); i++) {
      let index = await contract.trades(i);
      emptyArr.push(index);
    }
    setTotalTrades(emptyArr);
  };

  

  const [trade, setTrade] = useState(false);
  const getUserTrade = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddr = await signer.getAddress();
    const contract = new ethers.Contract(ca, abi.abi, signer);

    const numberOfTrades = await contract.getAlltrades();
    const array = [];
    for (let i = 0; i <= numberOfTrades.toNumber(); i++) {
      const element = await contract.trades(i);
      if (element.dealer == signerAddr || element.creator == signerAddr) {
        setTrade(element);
      }
    }
  };



  const web3Init = () => {
    setLoading(true)
    getCaData();
    getUserNft();
    getUserTrade();
     getIsTrading();
    setLoading(false)
  };
  useEffect(() => {
    web3Init()
    setTheme({
      navbarColor: colors[data?.properties?.name.value],
      mainBackground:bgColors[data?.properties?.name.value],
      neumorph: neumorph[data?.properties?.name.value],
  })
  }, [address,data]);

  return (
    <UserContext.Provider
      value={{
        userToken: data,
        loading: isLoading,
        userTokenId: userTokenId,
        totalTrades: totalTrades,
        ca: ca,
        trade: trade,
        isConnected: isConnected,
        web3Init: web3Init,
        isTrading:isTrading,
        web3Loading: loading,
        theme:theme
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext };
