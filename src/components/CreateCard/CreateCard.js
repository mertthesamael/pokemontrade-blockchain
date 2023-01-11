import { Button, Flex, Image, Spinner, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/context";
import { ethers } from "ethers";
import abi from "../../contracts/PokemonCards.sol/PokemonCards.json";
import { useContractEvent } from "wagmi";


const CreateCard = () => {
  const { userToken, userTokenId, ca, web3Init, theme, contract,refetch,address, refetchTrade } = useContext(UserContext);
  const toast = useToast();
  const [loading, setLoading] = useState(false);


  const createTrade = async () => {
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ca, abi.abi, signer);
    try {
      await contract.setTrade(userTokenId);
      setLoading(true)
    } catch (err) {
      toast({
        title: err.reason,
        status: "error",
      });
    }
  }
  

  useContractEvent({
    address: ca,
    abi: abi.abi,
    eventName: 'TradeCreated',
    listener(_address, _id) {
    if(_address == address){
      setTimeout(() => {
        
        toast({
          title:'Trade Created',
          status:'success',
          description:'You can see it on Trades or MyTrade tab !'
        })
        web3Init()
        setLoading(false)
      }, 6000);
       
    }
      
    },
    once:true
   
 
  })
useEffect(() => {
web3Init()
},[])
  if (userTokenId == 0) {
    return null;
  }
  return (
    <Flex flexDir="column" p='2rem' gap='3rem' w="20rem" borderRadius='20px' h="max-content" style={theme.neumorph}>
      <Flex w="100%" justifyContent="center">
        <Image
          draggable="false"
          h="20rem"
          src={userToken?.properties.image.value}
        />
      </Flex>
      <Flex w="100%" justifyContent="center">
        {loading? <Spinner />
        :
        <Button onClick={createTrade}>Trade it !</Button>
        }
      </Flex>
    </Flex>
  );
};

export default CreateCard;
