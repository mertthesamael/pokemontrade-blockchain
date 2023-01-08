import { Box, Flex } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { UserContext } from "../../store/context";

const Body = ({ children }) => {
  const { userToken,theme } = useContext(UserContext);
useEffect(() => {
  document.body.style.background = theme.mainBackground
},[])
  return (
    <Flex
      w="100%"
      pos="relative"
      h="100%"
      transition='all 1s ease'
      bgColor={theme.mainBackground}
    >
      {children}
    </Flex>
  );
};

export default Body;
