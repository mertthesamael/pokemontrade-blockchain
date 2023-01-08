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
import { ConnectButton } from "@rainbow-me/rainbowkit";

const SideMenu = () => {
  const { isConnected, userToken, userAddr, web3Init, ca, isTrading, trade,theme  } = useContext(UserContext);
 
  const { menuState, onMenuState, connect} = useContext(LayoutContext);
  const colors = {
    Charmander: "#AE431E",
    Bulbasaur: "#285430",
    Squirtle: "#263159",
    Pikachu: "#C58940",
  };

  return (
    <Flex
      zIndex="2"
      className={styles.sideMenu}
      pos="relative"
      minW="15rem"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      p="2rem 0"
      h="6rem"
      bgColor={theme.navbarColor}
    >
      <Flex
        className={styles.navItems}
        flexDir="row"
        w="100%"
        justify="space-evenly"
        align="center"
      >
        <NavLink to="/app">
          <NavItem title="App" />
        </NavLink>
        <NavLink to="/mynft">
          <NavItem title="MyNft" />
        </NavLink>
        <NavLink to="/trades">
          <NavItem title="Trades" />
        </NavLink>
        <NavLink to="/trade">
          <NavItem title="Trade" />
        </NavLink>
        <NavLink style={{position:'relative'}} to="/mytrade">
          <NavItem title="MyTrade" />
          {isTrading&&<WarningIcon position='absolute' color={trade?.dealerTokenId?.toNumber() && trade.creatorTokenId.toNumber() && 'green'} top='0' right='0'/>}
        </NavLink>
        <Flex>
          <ConnectButton accountStatus={{
    smallScreen: 'avatar',
    largeScreen: 'full',
  }} showBalance={false}/>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideMenu;
