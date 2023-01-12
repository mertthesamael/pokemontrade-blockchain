import { Box, Button, Flex, Text } from "@chakra-ui/react";
import NavItem from "../../components/NavItem/NavItem";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../store/context";
import { LayoutContext } from "../../store/layoutContext";
import styles from "./sidemenu.module.scss";
import { HamburgerIcon, WarningIcon } from "@chakra-ui/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navigation = () => {
  const {isTrading, trade,theme } = useContext(UserContext);
 
  const { menuState, onMenuState} = useContext(LayoutContext);
  const colors = {
    Charmander: "#AE431E",
    Bulbasaur: "#285430",
    Squirtle: "#263159",
    Pikachu: "#C58940",
  };
  const menuStateHandler = () => {
    console.log(menuState)
    return onMenuState()
  }
  return (
    <Flex
      zIndex="2"
      className={styles.sideMenu}
      pos="relative"
      minW="15rem"
      justifyContent="center"
      alignItems="center"
      p="2rem 1rem"
      h="6rem"
      bgColor={theme.navbarColor}
    >
      <Flex className={styles.menuIcon} onClick={menuStateHandler}  w='100%'>
        <HamburgerIcon h='2rem'  w='2rem' color='white'></HamburgerIcon>
      </Flex>
      <Flex
        flexDir="row"
        w="100%"
        justify="space-evenly"
        align="center"
        className={styles.navItems}

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
      </Flex>
        <Flex w='20%'>
          <ConnectButton accountStatus={{
    smallScreen: 'avatar',
    largeScreen: 'full',
  }} showBalance={false}/>
        </Flex>
    </Flex>
  );
};

export default Navigation;
