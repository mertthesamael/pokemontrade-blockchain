import { Box, Text } from "@chakra-ui/react"
import styles from "./navitem.module.scss"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../store/context"
import { useLocation, useNavigate } from "react-router-dom"



const NavItem = ({title}) => {

    const {theme, userToken} = useContext(UserContext)
    const [selected, setSelected] = useState()
    const location = useLocation()
    const neumorph = {
        Pikachu: {
          background: theme.navbarColor,
          boxShadow: "12px 12px 24px #a77436, -12px -12px 24px #e39e4a",
        },
        Charmander: {
          background: theme.navbarColor,
          boxShadow: "10px 11px 21px #94391a, -10px -10px 20px #c84d23",
        },
        Bulbasaur: {
          background: theme.navbarColor,
          boxShadow: "10px 11px 21px #224729, -10px -10px 20px #2e6137",
        },
        Squirtle: {
          background: theme.navbarColor,
          boxShadow: "10px 11px 21px #202a4c, -10px -10px 20px #2c3866",
        }}


        useEffect(() => {

        },[])

        const locationHandler = () => {
            selected(location.pathname.slice(1))
        }
    return(
        <Box borderRadius='10px' p='0.7rem'
        style={neumorph[userToken?.properties?.name.value]}>
            <Text fontWeight='bolder' onClick={locationHandler} color='white' fontSize='1rem'>{title}</Text>
        </Box>
    )

}

export default NavItem;