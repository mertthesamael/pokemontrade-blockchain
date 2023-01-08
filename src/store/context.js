import React, { useEffect, useState } from "react";
import { useGetData } from "../hooks/useGetData";
import abi from "../contracts/PokemonCards.sol/PokemonCards.json";
import { useToast } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { bgColors, colors, neumorph, neumorphInset } from "../styles/themeColors";
import useGetContract from "../hooks/useGetContract";

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

  const contract = useGetContract(ca,abi.abi)


  const {address, isConnected} = useAccount()
  const toast = useToast();
  const [theme, setTheme] = useState({
    navbarColor: '#0A2647',
    mainBackground:'#16213E',
    neumorph: {background: "#0A2647",
    boxShadow: "10px 10px 21px #051425, -10px -10px 21px #0f3869"},
    pressed:{boxShadow:'inset 10px 12px 30px #051425, inset 500px 500px 800px #0f3869'}
  })
//background:'linear-gradient(145deg, #092240, #0b294c)'

  const getIsTrading = async() => {


    const data = await contract.isTrading(address);
    if(data){
      setIsTrading(true)
    }else{
      setIsTrading(false)
    }
  }

  const getUserNft = async () => {
 
    try{
      const nfts = await  contract.getAll(address);
      const tokenUri = await contract.tokenURI(nfts[nfts.length - 1].toNumber());
      setTokenUri(tokenUri);
      setUserTokenId(nfts[nfts.length - 1].toNumber());
    
    }catch(err){
      setTokenUri('');
      setUserTokenId('');
    }
  };

  const getCaData = async () => {
  
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
    const numberOfTrades = await contract.getAlltrades();
    const array = [];
    for (let i = 0; i <= numberOfTrades.toNumber(); i++) {
      const element = await contract.trades(i);
      if (element.dealer == address || element.creator == address) {
        setTrade(element);
      }else{
        setTrade(false)
      }
    }
  };



  const web3Init = async () => {
    setLoading(true)
    await getCaData();
    await getUserNft();
    await getIsTrading();
    await getUserTrade();
    setLoading(false)
  };

  useEffect(() => {
        web3Init()
        data?.properties&&
        setTheme({
          navbarColor: colors[data?.properties?.name.value],
          mainBackground:bgColors[data?.properties?.name.value],
          neumorph: neumorph[data?.properties?.name.value],
          pressed:neumorphInset[data?.properties?.name.value]
        })
      
        if(isConnected==false || userTokenId == false){
          setTheme({
            navbarColor: '#0A2647',
            mainBackground:'#16213E',
            neumorph: {background: "#0A2647",
            boxShadow: "10px 10px 21px #051425, -10px -10px 21px #0f3869"},
            pressed:{boxShadow:'inset 10px 12px 30px #051425, inset 500px 500px 800px #0f3869'}
          })
        }
        
        
      }, [contract,address,data,isConnected]);
      
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
        theme:theme,
      
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext };
