import { Button, Flex, Text } from "@chakra-ui/react";
import UserTrade from "../../components/UserTrade/UserTrade";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/context";
import { useNavigate } from "react-router-dom";
import Trade from "../../components/Trade/Trade";
import styles from "./mytrade.module.scss"
import { useGetContractData } from "../../hooks/useGetContractData";
import { ethers } from "ethers";
import abi from "../../contracts/PokemonCards.sol/PokemonCards.json"
const MyTrade = () => {
  const { completedTrades,address,ca,trade } = useContext(UserContext);
  const {data:allTrades} = useGetContractData("totalTrades",null,ca)

 
  
 
  let tsx = completedTrades?.filter(x=> x.creator == address || x.dealer == address)

 
  const navigate = useNavigate();
  const navigateUser = (path) => {
    return navigate(path);
  };
  if (
    trade.creatorTokenId == 0 ||
    trade.isCompleted == true ||
    trade == false
  ) {
    return (
      <Flex
        gap="2rem"
        justify="center"
        flexDir="column"
        align="center"
        w="100%"
        h="100%"
      >
        <Text fontSize="30px" fontWeight="bolder" color="white">
          You Dont Have Any Active Trades
        </Text>
        <Button onClick={() => navigate("/trade")}>Make One !</Button>
        <Text fontSize="30px" fontWeight="bolder" color="white">
          OR
        </Text>
        <Button onClick={() => navigate("/trades")}>Look For Trade</Button>
        <Flex>
          <Text color='white' fontWeight='bolder' fontSize='30px'>TSX History</Text>
        </Flex>
      <Flex p='1rem'  flexDir='column' gap='2rem' overflow='auto' w='80%' h='16rem'>{tsx?.map(x=> <Trade id='2' trade={x}></Trade>)}</Flex>

      </Flex>
    );
  }
  return (
    <Flex justify="center" gap='3rem' flexDir='column' align="center" w="100%" h="100%">
      <Flex w='100%' justify='center'>
      <UserTrade />
      </Flex>
      <Text color='white' fontWeight='bolder' fontSize='30px'>TSX History</Text>

      <Flex className={styles.tsx}  p='1rem'  flexDir='column' gap='2rem' overflow='auto' w='60%' h='16rem' >{tsx?.map(x=> <Trade id='2' trade={x}></Trade>)}</Flex>
    </Flex>
  );
};

export default MyTrade;
