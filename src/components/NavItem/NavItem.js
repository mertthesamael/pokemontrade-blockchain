import { Box, Text } from "@chakra-ui/react"
import styles from "./navitem.module.scss"



const NavItem = ({title}) => {

    return(
        <Box className={styles.navItem}>
            <Text  color='white' fontSize='1.5rem'>{title}</Text>
        </Box>
    )

}

export default NavItem;