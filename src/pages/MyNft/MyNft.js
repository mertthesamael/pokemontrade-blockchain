import { Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../store/context";
import NftInfo from "../../components/NftInfo/NftInfo";

const MyNft = () => {
  const { userToken, loading } = useContext(UserContext);

  return (
    <Flex justify="center" align="center" w="100%" h="100%">
      <NftInfo token={userToken}/>
    </Flex>
  );
};

export default MyNft;
