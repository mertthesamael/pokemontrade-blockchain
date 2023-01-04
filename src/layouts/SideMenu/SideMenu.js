import { Button, Flex } from "@chakra-ui/react"
import NavItem from "../../components/NavItem/NavItem";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../store/context";





const SideMenu = () => {
    
    const {userToken} = useContext(UserContext);

    const colors={Charmander:'#AE431E',
                  Bulbasaur:'#285430',
                  Squirtle:'#263159',
                  Pikachu:'#C58940'
                }
    return(
        <Flex pos='relative' w='20rem' flexDir='column' align={'center'} p='4rem 0'  h='100%' bgColor={userToken?colors[userToken?.properties.name.value]:'#150050'}>
            <Flex flexDir='column' gap='2rem'>
                <NavLink to='/app'>
            <NavItem title='Mint'/>
                </NavLink>
            <NavLink to='/mynft'>
            <NavItem title='My NFT'/>
            </NavLink>
            <NavLink to='/trades'>
            <NavItem title='Open Trades'/>
            </NavLink>
            <NavLink to='/trade'>
            <NavItem title='Trade'/>
            </NavLink>
            <NavLink to='/mytrade'>
            <NavItem title='My Trades'/>
            </NavLink>
            </Flex>
            <Flex pos='absolute' bottom='4rem' >
                <Button backdropFilter='blur(6px)' color='white' boxShadow='0 0px 5px 0px white' background='rgba( 255, 255, 255, 0.05 )' _hover={{background:'white', color:'black', transform:'scale(1.1)'}}>Connect</Button>
            </Flex>
        </Flex>
    )

}

export default SideMenu;