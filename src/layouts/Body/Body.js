import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react"
import { useContext } from "react";
import { UserContext } from "../../store/context";
import { LayoutContext } from "../../store/layoutContext";
import styles from "./body.module.scss"


const Body = ({children}) => {

const {userToken} = useContext(UserContext);
const {menuState, onMenuState} = useContext(LayoutContext);
    const colors={Charmander:'#EA5C2B',
                  Bulbasaur:'#3C6255',
                  Squirtle:'#064663',
                  Pikachu:'#E5BA73'
                }
const menuStateHandler = () => {
    onMenuState()
}
    return(
        <Flex  w='100%' pos='relative' h='100%' bgColor={userToken?colors[userToken.properties.name.value]:'#16213E'}>
            {menuState==false&&
            <Box pos='absolute' left='2rem' top='2rem' className={styles.menuBox}>
            <HamburgerIcon  onClick={menuStateHandler}  color='white' w='2rem' height='2rem' />
            </Box>
            }
            
            {children}
        </Flex>
    )


}


export default Body;