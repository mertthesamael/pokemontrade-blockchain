import { Button, Flex, Text } from "@chakra-ui/react";
import CreateCard from "../../components/CreateCard/CreateCard";
import { useContext } from "react";
import { UserContext } from "../../store/context";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const CreateTrade = () => {
  const { isConnected } = useContext(UserContext);
  return (
    <Flex w="100%" justifyContent="center" alignItems="center" h="100%">
      {isConnected ? <CreateCard /> :<ConnectButton />}
    </Flex>
  );
};

export default CreateTrade;
