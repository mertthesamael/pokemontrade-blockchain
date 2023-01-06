import { Button, Flex, Text } from "@chakra-ui/react";
import CreateCard from "../../components/CreateCard/CreateCard";
import { useContext } from "react";
import { UserContext } from "../../store/context";

const CreateTrade = () => {
  const { isConnected, web3Init } = useContext(UserContext);
  return (
    <Flex w="100%" justifyContent="center" alignItems="center" h="100%">
      {isConnected ? <CreateCard /> : <Button onClick={() => web3Init()}>Connect</Button>}
    </Flex>
  );
};

export default CreateTrade;
