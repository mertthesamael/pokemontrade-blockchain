
import { Box, Button, Flex, propNames, Text } from "@chakra-ui/react"
import NavItem from "../../components/NavItem/NavItem";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../store/context";
import { LayoutContext } from "../../store/layoutContext";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import styles from "./mobilesidemenu.module.scss"


const MobileSideMenu = ({children}) => {
    const {isConnected,userToken,userAddr} = useContext(UserContext);
    const {menuState, onMenuState} = useContext(LayoutContext)
    const colors={Charmander:'#AE431E',
                  Bulbasaur:'#285430',
                  Squirtle:'#263159',
                  Pikachu:'#C58940'
                }

                const menuStateHandler = () => {
                    onMenuState()
                }
return(
    <Flex className={styles.mobileSideMenu} pos='relative' w='100vw' h='100vh'>

    <Flex  bgColor='black' w='100%'  h='100%'>
        <Text color='black' fontSize='20rem'>MobileSideMenu</Text>
        <Flex pos='relative' w='20rem' flexDir='column' align={'center'} p='7rem 0'  h='100%' bgColor={userToken?colors[userToken?.properties.name.value]:'#150050'}>
               {menuState&& <Box onClick={menuStateHandler} className={styles.menuBox} pos='absolute' top='2rem' left='2rem'>
                <CloseIcon color='white' w='1.4rem' height='1.4rem'></CloseIcon>
                </Box>}
                
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
            {isConnected?
                <Button maxW='6rem' backdropFilter='blur(6px)' color='white' boxShadow='0 0px 5px 0px white' background='rgba( 255, 255, 255, 0.05 )' _hover={{background:'white', color:'black', transform:'scale(1.1)'}}>
                    <Text textOverflow='ellipsis' overflow='hidden' whiteSpace='nowrap'>
                    {userAddr}
                    </Text>
                    </Button>
                :
                <Button backdropFilter='blur(6px)' color='white' boxShadow='0 0px 5px 0px white' background='rgba( 255, 255, 255, 0.05 )' _hover={{background:'white', color:'black', transform:'scale(1.1)'}}>Connect</Button>
            }
            </Flex>
        </Flex>
        <Flex w='100%' h='100%'  pos='absolute'right='0' bgColor='red'>

        </Flex>
        
    </Flex>
    {children}
    </Flex>
)

}

export default MobileSideMenu