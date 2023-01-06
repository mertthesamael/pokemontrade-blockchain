import { Box, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../store/context";

const Body = ({ children }) => {
  const { userToken } = useContext(UserContext);
  const colors = {
    Charmander: "#EA5C2B",
    Bulbasaur: "#3C6255",
    Squirtle: "#064663",
    Pikachu: "#E5BA73",
  };
 
  return (
    <Flex
      w="100%"
      pos="relative"
      h="100%"
      transition='all 1s ease'
      bgColor={userToken ? colors[userToken.properties.name.value] : "#16213E"}
    >
      {children}
    </Flex>
  );
};

export default Body;
