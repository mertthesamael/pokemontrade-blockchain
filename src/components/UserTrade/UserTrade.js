import { Button, Flex, Image, Progress, Spinner, useToast } from "@chakra-ui/react";
import Trade from "../Trade/Trade";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../../contracts/PokemonCards.sol/PokemonCards.json";
import { UserContext } from "../../store/context";
import switchIcon from "../../assets/switchIcon.svg";
import { useNavigate } from "react-router-dom";
import { useContractEvent } from "wagmi";
import styles from "./usertrade.module.scss"
const UserTrade = () => {
  const { ca, trade, web3Init, loading:web3Loading, contract,address } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [creatorApplied, setCreatorApplied] = useState(trade.creatorConfirm)
  const [dealerApplied, setDealerApplied] = useState(trade.delaerConfirm)
  const [creatorLoading, setCreatorLoading] = useState(false)
  const [dealerLoading, setDealerLoading] = useState(false)
  const [finalizeLoading, setFinalizeLoading] = useState(false)
  const [cancelLoading, setCancelLoading] = useState(false)
  const navigate = useNavigate();
  const toast = useToast();
  const applyTrade = async () => {

    if(address == trade.creator){
       setCreatorLoading(true)
    }else if(address == trade.dealer){
       setDealerLoading(true)
    }
    try {
        await contract.approveTrade(trade.tradeId)
    } catch (err) {
      toast({
        title: err.reason,
        status: "error",
      });
      setLoading(false);
      setDealerLoading(false)
      setCreatorLoading(false)

    }
  };
  const cancelTrade = async () => {
    setCancelLoading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ca, abi.abi, signer);
    try {
      await contract.cancelTrade(trade.tradeId)
      
    } catch (err) {
      toast({
        title: err.reason,
        status: "error",
      });
      setLoading(false);
      setCancelLoading(false)
    }
  };
  const finalizeTrade = async () => {
    setLoading(true);
    setFinalizeLoading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ca, abi.abi, signer);
    try{
      
      await contract.finalizeTrade(trade.tradeId);
    }catch(err){
      toast({
        title:err.reason,
        status:'error'
      })
      setLoading(false)
      setFinalizeLoading(false)
      
      
    }
  };

 
  useContractEvent({
    address: ca,
    abi: abi.abi,
    eventName: 'Cancel',
    listener(_addr,_i) {
      if(_addr = address){
        setTimeout(() => {
          
          toast({
            title:'Trade is Cancelled.',
            status:'warning'
          })
          setLoading(false);
          setCancelLoading(false);
          web3Init()
          window.location.reload(false)
        }, 7000);
      }
    },
    once: true,
  })

useContractEvent({ 
    address: ca,
    abi: abi.abi,
    eventName: 'CreatorConfirmed',
    listener(addr, i) {
      if(addr == address){
setTimeout(() => {
  
  toast({
    title:'Creator Confirmed !',
    status:'success'
  })
  setLoading(false);
  setCreatorApplied(true)
  setCreatorLoading(false)
  setCreatorApplied(true)
  web3Init()
}, 7000);
      }
    },
   once:true
  })
useContractEvent({
    address: ca,
    abi: abi.abi,
    eventName: 'DealerConfirmed',
    listener(addr, i) {
      if(addr == address){
setTimeout(async() => {

  toast({
    title:'Dealer Confirmed !',
    status:'success'
  })
  setLoading(false);
  setDealerLoading(false)
  setDealerApplied(true)
  await web3Init()
}, 7000);
      }
      
      },
   once:true
  })
  
useContractEvent({
    address: ca,
    abi: abi.abi,
    eventName: 'FinalizeTrade',
    listener() {
      setTimeout(async() => {
        toast({
          title:'Trade Completed !',
          status:'success',
          description:'Go to MyNft page to check your new NFT !'
        })
        setLoading(false);
        setFinalizeLoading(false)
        
       await web3Init()
        navigate('/mynft')
    
        
      }, 7000);
    },
   once:true
  })
  

  useEffect(() => {
    setDealerApplied(false)
    setCreatorApplied(false)
    web3Init()
  },[])



  if (trade.creatorTokenId == 0 || trade.isCompleted == true) {
    return null;
  }
  return (
    <Flex className={styles.userTrade} w="80%" h="28rem" gap='1rem' flexDir="column">
      {web3Loading? <Spinner />
        :
        <>
      {trade.isCompleted == false ? <Trade trade={trade}></Trade> : <Spinner />}
      <Flex w="100%" h="8rem">
        <Flex w="100%" h="100%" align="center">
          <Flex maxH="100%">
            {creatorLoading ? (
              <Spinner />
              ) : (
               <Button border='1px solid white' colorScheme={trade.creatorConfirm || creatorApplied?'green':""} onClick={applyTrade}>{trade.creatorConfirm || creatorApplied ?'Confirmed':'Confirm'}</Button>
                )}
                        </Flex>
                        <Progress w='100%' bgColor='grey' colorScheme='green' isIndeterminate={creatorLoading} size='sm' value={trade.creatorConfirm || creatorApplied? 100: 0}/>
        </Flex>
        <Flex w="max-content" h="100%" justify="center" align="center">
          {finalizeLoading?<Spinner></Spinner>:<Image
            cursor="pointer"
            onClick={finalizeTrade}
            w="300px"
            maxH="100%"
            filter={
              (creatorApplied && dealerApplied)
              ? "invert(52%) sepia(35%) saturate(637%) hue-rotate(95deg) brightness(95%) contrast(96%)"
              : "invert(0.5) drop-shadow(3px 1px 0px black)"
            }
            src={switchIcon}
            ></Image>}
        </Flex>

        <Flex w="100%" h="100%" justify="flex-end" align="center">
            <Progress w='100%' bgColor='grey' colorScheme='green' isIndeterminate={dealerLoading} size='sm' value={trade.dealerConfirm|| dealerApplied? 100: 0}/>
          
          <Flex maxH="100%">
            {dealerLoading? (
              <Spinner />
              ) : (
                <Button border='1px solid white' colorScheme={trade.dealerConfirm || dealerApplied?'green':"default"} onClick={applyTrade}>{trade.dealerConfirm || creatorApplied ?'Confirmed':'Confirm'}</Button>
                
                )}
          </Flex>
        </Flex>
      </Flex>
      <Flex w="100%" p='2rem' justify="center">
        {cancelLoading?<Spinner></Spinner>:<Button onClick={cancelTrade} colorScheme='red'>Cancel Trade</Button>}
      </Flex>
    </>
    }
    </Flex>
  );
};

export default UserTrade;
