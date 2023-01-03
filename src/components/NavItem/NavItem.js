import { Box, Text } from "@chakra-ui/react"
import styles from "./navitem.module.scss"



const NavItem = ({title}) => {

    return(
        <Box className={styles.navItem}>
            <Text color='#6E85B2' fontSize='1.8rem'>{title}</Text>
        </Box>
    )

}

export default NavItem;