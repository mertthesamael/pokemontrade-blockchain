import { Button, Flex, Grid, Image, Spinner, Text, useToast } from "@chakra-ui/react";
import TradeIcon from "../../assets/tradeIcon.svg";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../../contracts/PokemonCards.sol/PokemonCards.json";
import { useGetData } from "../../hooks/useGetData";
import { UserContext } from "../../store/context";
import styles from "./trade.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useContractEvent, useContractRead } from "wagmi";
import { useGetContractData } from "../../hooks/useGetContractData";

const Trade = ({ trade }) => {
  const [creatorUri, setCreatorUri] = useState();
  const [dealerUri, setDealerUri] = useState();
  const [loading, setLoading] = useState();
  const { ca, web3Init, userToken, trade:userTrade, web3Loading, contract, theme, address } = useContext(UserContext);
  const {data:_creatorToken} = useGetContractData("tokenURI",trade.creatorTokenId.toNumber(),ca)
  const {data:_dealerToken} = useGetContractData("tokenURI",trade.dealerTokenId.toNumber(),ca)
  const { data: creatorToken } = useGetData(_creatorToken);
  const { data: dealerToken } = useGetData(_dealerToken);


  const toast = useToast();

const navigate = useNavigate()
  useContractEvent({
    address: ca,
    abi: abi.abi,
    eventName: 'Bid',
    listener() {
      setLoading(false)
     
      web3Init()
    },
    once: true,
  })
  useContractEvent({
    address: ca,
    abi: abi.abi,
    eventName: 'TradeCreated',
    listener() {
      setLoading(false);
      web3Init();
    },
   
    once: true,
  })
  const contractRead = useContractRead({
    address: ca,
    abi: abi.abi,
    functionName: 'tokenURI',
    args:[2],
    onSuccess(data) {
      console.log('Success', data)
    },
  })


  const bidTrade = async () => {
    setLoading(true)
    const nfts = await contract.getAll(address);
    const nftId = await nfts[nfts.length - 1].toNumber();
    try {
      await contract.bidTrade(trade.tradeId.toNumber(), nftId);
    } catch (err) {
      toast({
        title: err.reason,
        status: "error",
      });
      setLoading(false)
    }
  };

  useEffect(() => {
 
    web3Init()


  }, []);

  return (
    <Flex
      className={styles.trade}
      p="2rem"
      w="100%"
      h="15rem"
      justify="space-between"
    >
      <Flex h="100%" w="100%" flexDir="column">
        <Flex>
        
        </Flex>
        <Flex
          p="1rem"
          minW="8rem"
          w='max-content'
          style={theme.neumorph}
          h="100%"
        >
         {web3Loading?<Spinner></Spinner>: <Image
            h="100%"
            draggable="false"
            src={creatorToken?.properties.image.value}
          />}
        </Flex>
        <Flex p="0 1.1rem">
          <Text
            color="white"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            border={address == trade.creator ? '1px solid white' : ''}
            borderRadius='15px'
            p='0 5px'
            w="100px"
          >
            {trade.creator}
          </Text>
        </Flex>
      </Flex>

      <Flex h="100%" maxW="100%" minW="10rem" justify="center">
        <Grid placeItems="center">
          {web3Loading?<Spinner></Spinner>:<Image
            filter={
              trade.isCompleted
                ? "invert(56%) sepia(91%) saturate(371%) hue-rotate(68deg) brightness(92%) contrast(80%) "
                : "invert(0.5) "
            }
            h="10rem"
            draggable="false"
            src={TradeIcon}
          />}
        </Grid>
      </Flex>
      <Flex h="100%" w="100%" align="flex-end" flexDir="column">
        {trade[1] && trade.dealerTokenId.toNumber() == 0 ? (
          <Flex justify="flex-end" h="100%" align="center">
            {loading?<Spinner/>: userToken?<Button onClick={bidTrade}>Apply Trade</Button>:
            <NavLink to='/app'>
            <Button colorScheme='red' onClick={bidTrade}>Mint Token</Button>
            </NavLink>
            }
          </Flex>
        ) : (
          <>
            <Flex
              p="1rem"
              minW="8rem"
              w='max-content'
              justify="flex-end"
              style={theme.neumorph}
              h="100%"
            >
            {web3Loading?<Spinner /> : <Image
                h="100%"
                draggable="false"
                src={dealerToken?.properties.image.value}
              />}
            </Flex>
            <Flex p="0 1rem" justify="flex-end">
              <Text
                color="white"
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
                border={address == trade.dealer ? '1px solid white' : ''}
                borderRadius='15px'
                w="100px"
                p='0 5px'
              >
                {trade.dealer}
              </Text>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Trade;
