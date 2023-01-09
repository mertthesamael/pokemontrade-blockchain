import { Flex, Text } from "@chakra-ui/react";
import Trade from "../../components/Trade/Trade";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/context";
import styles from "./opentrades.module.scss"
const OpenTrades = () => {
  const { totalTrades, completedTrades,address } = useContext(UserContext);
 

  return (  
    <Flex w="100%" flexDir="column" justify="center" align="center" h="100%">
      <Flex
        flexDir="column"
        p="5rem 10rem"
        gap="2rem"
        alignItems="center"
        w="100%"
        h="100%"
        overflowY="auto"
        className={styles.openTrades}
      >
        {
        totalTrades?.map((trade) => <Trade id="2" trade={trade} />)
        
      }
     
      </Flex>
    </Flex>
  );
};

export default OpenTrades;
