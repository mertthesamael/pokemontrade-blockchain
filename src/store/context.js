import React, { useEffect, useState } from "react";
import { useGetData } from "../hooks/useGetData";
import abi from "../contracts/PokemonCards.sol/PokemonCards.json";
import { useToast } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { bgColors, colors, neumorph, neumorphInset } from "../styles/themeColors";
import useGetContract from "../hooks/useGetContract";
import { useGetContractData } from "../hooks/useGetContractData";

const UserContext = React.createContext({
  emptyValue: "",
});

export const UserContextWrapper = (props) => {
  const ca = "0x0b91EDb6C2e1e055c3774D646846662f33d8842C";

  const [userTokenId, setUserTokenId] = useState(0);
  const [totalTrades, setTotalTrades] = useState();
  const [completedTrades, setCompletedTrades] = useState()
  const [userTotalTokens, setUserTotalTokens] = useState(0)
  const [tokenUri, setTokenUri] = useState()
  const [loading, setLoading] = useState()
  const [isTrading, setIsTrading] = useState()
  
  const contract = useGetContract(ca,abi.abi)
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
  const getIsTrading = async() => {


    const data = await contract.isTrading(address);
    if(data){
      setIsTrading(true)
    }else{
      setIsTrading(false)
    }
      }
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
  const defaultUserToken = () => {
      try{
        return setUserTokenId(userTokens[userTokens.length-1].toNumber())
      }catch{
        return setUserTokenId(-1)

      }
  }
  const {data:allTrades} = useGetContractData("totalTrades",null,ca)
  const getCaData = async () => {
    let emptyArr = [];
    let completedOnes = []
    for (let i = 1; i <= allTrades.toNumber(); i++) {
      let index = await contract.trades(i);
      if(index.isCompleted==true){
        completedOnes.push(index)
      }else if(index.isCompleted==false&&index.creatorTokenId.toNumber()!==0){
        emptyArr.push(index);
      }
    }
    setTotalTrades(emptyArr);
    setCompletedTrades(completedOnes)
  };
  const [trade, setTrade] = useState(false);

  const {data:userTokens} = useGetContractData("getAll",address,ca)
  const { data, isLoading } = useGetData(tokenUri);


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
    getUserTrade();
 getCaData();
  getUserNft();
 getIsTrading();

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
          else{
            defaultUserToken()
            setTheme({
              navbarColor: colors[data?.properties?.name.value],
              mainBackground:bgColors[data?.properties?.name.value],
              neumorph: neumorph[data?.properties?.name.value],
              pressed:neumorphInset[data?.properties?.name.value]
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
        contract:contract,
        address:address,
        completedTrades:completedTrades
      
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext };
