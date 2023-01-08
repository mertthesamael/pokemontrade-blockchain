import { Button, Flex, Image, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/context";
import { ethers } from "ethers";
import abi from "../../contracts/PokemonCards.sol/PokemonCards.json";

const CreateCard = () => {
  const { userToken, userTokenId, ca, web3Init, theme } = useContext(UserContext);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const createTrade = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ca, abi.abi, signer);
    try {
      await contract.setTrade(userTokenId);
    } catch (err) {
      toast({
        title: err.reason,
        status: "error",
      });
    }
  };
  const checkEvents = () => {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(ca, abi.abi, provider);
    contract.on("TradeCreated", () => {
      setLoading(false);
      web3Init();
      toast({
        title:'Trade Opened !',
        status:'success'
      })
    });
  };

  useEffect(() => {
    checkEvents();
  }, []);
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
        <Button onClick={createTrade}>Trade it !</Button>
      </Flex>
    </Flex>
  );
};

export default CreateCard;
