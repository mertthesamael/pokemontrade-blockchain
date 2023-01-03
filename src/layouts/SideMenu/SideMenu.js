import { Box, Button, Flex } from "@chakra-ui/react"
import NavItem from "../../components/NavItem/NavItem";





const SideMenu = () => {


    return(
        <Flex pos='relative' w='20rem' flexDir='column' align={'center'} p='4rem 0'  h='100%' bgColor='#150050'>
            <Flex flexDir='column' gap='2rem'>
            <NavItem title='Mint'/>
            <NavItem title='My NFT'/>
            <NavItem title='Open Trades'/>
            <NavItem title='Trade'/>
            </Flex>
            <Flex pos='absolute' bottom='4rem' >
                <Button backdropFilter='blur(6px)' color='white' boxShadow='0 0px 5px 0px white' background='rgba( 255, 255, 255, 0.05 )' _hover={{background:'white', color:'black', transform:'scale(1.1)'}}>Connect</Button>
            </Flex>
        </Flex>
    )

}

export default SideMenu;