import { Box, Button, Flex, Text } from "@chakra-ui/react";
import NavItem from "../../components/NavItem/NavItem";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/context";
import { LayoutContext } from "../../store/layoutContext";
import styles from "./sidemenu.module.scss";
import abi from "../../contracts/PokemonCards.sol/PokemonCards.json"
import { ethers } from "ethers";
import { WarningIcon } from "@chakra-ui/icons";

const SideMenu = () => {
  const { isConnected, userToken, userAddr, web3Init, ca, isTrading, trade } = useContext(UserContext);
 
    


 
  const { menuState, onMenuState, connect } = useContext(LayoutContext);
  const colors = {
    Charmander: "#AE431E",
    Bulbasaur: "#285430",
    Squirtle: "#263159",
    Pikachu: "#C58940",
  };
console.log(trade.dealerTokenId, trade.creatorTokenId)
  const connectWal = () => {
    web3Init();
  };
  return (
    <Flex
      zIndex="2"
      boxShadow={
        menuState
          ? userToken
            ? `0 0 10px 10px ${colors[userToken.properties.name.value]}`
            : "0 10px 50px 1px darkblue"
          : ""
      }
      className={styles.sideMenu}
      pos="relative"
      minW="15rem"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      p="2rem 0"
      h="6rem"
      bgColor={userToken ? colors[userToken?.properties.name.value] : "#150050"}
    >
      <Flex
        className={styles.navItems}
        flexDir="row"
        w="100%"
        justify="space-evenly"
        align="center"
      >
        <NavLink to="/app">
          <NavItem title="Mint" />
        </NavLink>
        <NavLink to="/mynft">
          <NavItem title="My NFT" />
        </NavLink>
        <NavLink to="/trades">
          <NavItem title="Open Trades" />
        </NavLink>
        <NavLink to="/trade">
          <NavItem title="Trade" />
        </NavLink>
        <NavLink style={{position:'relative'}} to="/mytrade">
          <NavItem title="My Trades" />
          {isTrading&&<WarningIcon position='absolute' color={trade?.dealerTokenId?.toNumber() && trade.creatorTokenId.toNumber() && 'green'} top='0' right='0'/>}
        </NavLink>
        <Flex>
          {isConnected ? (
            <Button
              maxW="6rem"
              backdropFilter="blur(6px)"
              color="white"
              boxShadow="0 0px 5px 0px white"
              background="rgba( 255, 255, 255, 0.05 )"
              _hover={{
                background: "white",
                color: "black",
                transform: "scale(1.1)",
              }}
            >
              <Text
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {userAddr}
              </Text>
            </Button>
          ) : (
            <Button
              onClick={connectWal}
              backdropFilter="blur(6px)"
              color="white"
              boxShadow="0 0px 5px 0px white"
              background="rgba( 255, 255, 255, 0.05 )"
              _hover={{
                background: "white",
                color: "black",
                transform: "scale(1.1)",
              }}
            >
              Connect
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideMenu;
