import { Box, Button, Flex, Image, Spinner, useToast } from "@chakra-ui/react";
import Trade from "../Trade/Trade";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../../contracts/PokemonCards.sol/PokemonCards.json";
import { UserContext } from "../../store/context";
import checkMark from "../../assets/checkIcon.svg";
import switchIcon from "../../assets/switchIcon.svg";
import { useNavigate } from "react-router-dom";
import { CancelledError } from "react-query";

const UserTrade = () => {
  const { ca, trade, web3Init } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [creatorApplied, setCreatorApplied] = useState(false)
  const [dealerApplied, setDealerApplied] = useState(false)
  const [creatorLoading, setCreatorLoading] = useState(false)
  const [dealerLoading, setDealerLoading] = useState(false)
  const [finalizeLoading, setFinalizeLoading] = useState(false)
  const [cancelLoading, setCancelLoading] = useState(false)
  const navigate = useNavigate();

  const toast = useToast();
  const applyTrade = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddr = await signer.getAddress()
    const contract = new ethers.Contract(ca, abi.abi, signer);
    console.log(signerAddr, trade.creator)
    if(signerAddr == trade.creator){
       setCreatorLoading(true)
    }else if(signerAddr == trade.dealer){
       setDealerLoading(true)
    }
    try {
        await contract.approveTrade(trade.tradeId).then(() => console.log(trade));
    } catch (err) {
      toast({
        title: err.reason,
        status: "error",
      });
      setLoading(false);

    }
  };
  const cancelTrade = async () => {
    setCancelLoading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ca, abi.abi, signer);
    try {
      await contract.cancelTrade(trade.tradeId).then(() => checkEvents());
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
  const checkEvents = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(ca, abi.abi, provider);
    contract.on("CreatorConfirmed", () => {
      setLoading(false);
      setCreatorApplied(true)
      setCreatorLoading(false)
      toast({
        title:'Creator Has Confirmed ',
        status:'success'
      })

    });
    contract.on("DealerConfirmed", () => {
      setLoading(false);
      setDealerApplied(true)
      setDealerLoading(false)
      toast({
        title:'Dealer Has Confirmed ',
        status:'success'
      })


    });
    contract.on("FinalizeTrade", () => {
      web3Init();
      setLoading(false);
      setFinalizeLoading(false)
      navigate("/mynft");
      toast({
        title:'Trade Completed !',
        status:'success'
      })
    });
    contract.on("Cancel", () => {
      web3Init()
      setLoading(false);
      setCancelLoading(false)
      toast({
        title:'Trade Canceled !',
        status:'success'
      })
    });
  };

  useEffect(() => {
    checkEvents();
  }, []);

  if (trade.creatorTokenId == 0 || trade.isCompleted == true) {
    return null;
  }
  return (
    <Flex w="80%" h="28rem" gap='2.5rem' flexDir="column">
      {trade.isCompleted == false ? <Trade trade={trade}></Trade> : <Spinner />}
      <Flex w="100%" h="8rem">
        <Flex w="100%" h="100%" align="center">
          <Flex maxH="100%">
            {creatorLoading ? (
                <Spinner />
                ) : (
                    <Image
                    cursor="pointer"
                    w="100px"
                    onClick={applyTrade}
                      filter={
                          creatorApplied || trade.creatorConfirm
                          ? "invert(56%) sepia(91%) saturate(371%) hue-rotate(68deg) brightness(92%) contrast(80%) drop-shadow(-3px 1px 0px black)"
                          : "invert(0.5) drop-shadow(-3px 1px 0px black)"
                        }
                        zIndex="1"
                        invert={0.2}
                        maxH="100%"
                        src={checkMark}
                        ></Image>
                        )}
                        </Flex>
          <Box
            w="100%"
            h="0.5rem"
            pos="relative"
            left="-0.2rem"
            zIndex="0"
            boxShadow={"-2px 2px 0px 0px black"}
            bgColor={ creatorApplied || trade.creatorConfirm? "#4BB543" : "grey"}
            transition="all 1s ease"
          >
            <Box
              transition="all 1s ease"
              w={ creatorApplied || trade.creatorConfirm ? "100%" : "0%"}
              h="100%"
              bgColor="#4BB543"
            ></Box>
          </Box>
        </Flex>
        <Flex w="max-content" h="100%" justify="center" align="center">
          {finalizeLoading?<Spinner></Spinner>:<Image
            cursor="pointer"
            onClick={finalizeTrade}
            w="300px"
            maxH="100%"
            filter={
              (dealerApplied && creatorApplied)||(trade.creatorConfirm == true && trade.dealerConfirm == true)
                ? "invert(56%) sepia(91%) saturate(371%) hue-rotate(68deg) brightness(92%) contrast(80%) drop-shadow(3px 1px 0px black)"
                : "invert(0.5) drop-shadow(3px 1px 0px black)"
            }
            src={switchIcon}
          ></Image>}
        </Flex>

        <Flex w="100%" h="100%" justify="flex-end" align="center">
          <Flex
            w="100%"
            justify="flex-end"
            h="0.5rem"
            pos="relative"
            left="0.2rem"
            boxShadow={"2px 2px 0px 0px black"}
            bgColor={dealerApplied || trade.dealerConfirm ? "#4BB543" : "grey"}
            transition="all 1s ease"
          >
            <Box
              transition="all 1s ease"
              w={dealerApplied || trade.dealerConfirm ? "100%" : "0%"}
              h="100%"
              bgColor="#4BB543"
            ></Box>
          </Flex>
          <Flex maxH="100%">
            {dealerLoading? (
                <Spinner />
                ) : (
                    <Image
                    onClick={applyTrade}
                    cursor="pointer"
                    w="100px"
                    filter={
                        dealerApplied || trade.dealerConfirm
                        ? "invert(56%) sepia(91%) saturate(371%) hue-rotate(68deg) brightness(92%) contrast(80%) drop-shadow(3px 1px 0px black)"
                      : "invert(0.5) drop-shadow(3px 1px 0px black)"
                    }
                    maxH="100%"
                    src={checkMark}
                    />
            
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex w="100%" p='2rem' justify="center">
        {cancelLoading?<Spinner></Spinner>:<Button onClick={cancelTrade} colorScheme='red'>Cancel Trade</Button>}
      </Flex>
    </Flex>
  );
};

export default UserTrade;
