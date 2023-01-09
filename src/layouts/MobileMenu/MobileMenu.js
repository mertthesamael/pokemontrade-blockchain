import { Flex } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import NavItem from "../../components/NavItem/NavItem"
import { useContext } from "react"
import { UserContext } from "../../store/context"
import { LayoutContext } from "../../store/layoutContext"




const MobileMenu = () => {

    const {theme} = useContext(UserContext);
    const {menuState, onMenuState} = useContext(LayoutContext)
    const menuStateHandler = () => {
        return onMenuState()
      }
    return(
        <Flex  display={menuState?'flex':'none'} align='center' zIndex='10' justify='center' pos='absolute' w='100%' h='100%' bgColor={theme.mainBackground}>
            <Flex gap='5rem' flexDir='column'>
            <NavLink onClick={menuStateHandler} to="/app">
              <NavItem title="Mint" />
            </NavLink>
            <NavLink onClick={menuStateHandler} to="/mynft">
              <NavItem title="My NFT" />
            </NavLink>
            <NavLink onClick={menuStateHandler} to="/trades">
              <NavItem title="Open Trades" />
            </NavLink>
            <NavLink onClick={menuStateHandler} to="/trade">
              <NavItem title="Trade" />
            </NavLink>
            <NavLink onClick={menuStateHandler} to="/mytrade">
              <NavItem title="My Trades" />
            </NavLink>
            </Flex>
        </Flex>
    )

}

export default MobileMenu