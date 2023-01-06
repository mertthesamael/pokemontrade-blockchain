import { Button, Flex, Text } from "@chakra-ui/react";
import UserTrade from "../../components/UserTrade/UserTrade";
import { useContext } from "react";
import { UserContext } from "../../store/context";
import { useNavigate } from "react-router-dom";

const MyTrade = () => {
  const { trade } = useContext(UserContext);
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
      </Flex>
    );
  }
  return (
    <Flex justify="center" align="center" w="100%" h="100%">
      <UserTrade></UserTrade>
    </Flex>
  );
};

export default MyTrade;
