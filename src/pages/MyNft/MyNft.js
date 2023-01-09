import { Button, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../store/context";
import NftInfo from "../../components/NftInfo/NftInfo";
import { NavLink } from "react-router-dom";
const MyNft = () => {
  const { userToken, loading } = useContext(UserContext);

  return (
    <Flex justify="center" align="center" w="100%" h="100%">
      {loading?<Spinner/>:userToken && userToken.properties?<NftInfo token={userToken}/>:
      <Flex flexDir='column' gap='2rem' align='center'>
        <Text color='white' fontSize='30px' fontWeight='bolder'>You Don't Have Any NFT</Text>
        <NavLink to='/app'>
        <Button>Go Mint One !</Button>
        </NavLink>
      </Flex>
      }
    </Flex>
  );
};

export default MyNft;
