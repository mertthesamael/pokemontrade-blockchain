import { Button, Flex, Image, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/context";
import { ethers } from "ethers";
import abi from "../../contracts/PokemonCards.sol/PokemonCards.json";

const CreateCard = () => {
  const { userToken, userTokenId, ca, web3Init } = useContext(UserContext);
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
  const theme = {
    Pikachu: {
      borderRadius: "20px",
      background: "#E5BA73",
      boxShadow: "19px 19px 37px #c39e62, -19px -19px 37px #ffd684",
    },
    Charmander: {
      borderRadius: "20px",
      background: "#EA5C2B",
      boxShadow: "19px 19px 37px #c74e25, -19px -19px 37px #ff6a31",
    },
    Bulbasaur: {
      borderRadius: "20px",
      background: "#3C6255",
      boxShadow: "19px 19px 37px #335348, -19px -19px 37px #457162",
    },
    Squirtle: {
      borderRadius: "20px",
      background: "#064663",
      boxShadow: "19px 19px 37px #053c54, -19px -19px 37px #075172",
    },
  };
  useEffect(() => {
    checkEvents();
  }, []);
  if (userTokenId == 0) {
    return null;
  }
  return (
    <Flex flexDir="column" p='2rem' gap='3rem' w="20rem" h="max-content" style={theme[userToken?.properties.name.value]}>
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
