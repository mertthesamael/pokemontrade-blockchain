import { Box, Text } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../store/context"
import { useLocation, useNavigate } from "react-router-dom"



const NavItem = ({title}) => {

    const {theme, userToken} = useContext(UserContext)
    const location = useLocation()
    const neumorph = {
        Pikachu: {
          background: theme.navbarColor,
          boxShadow: "10px 10px 21px #a77436, -10px -10px 20px #e39e4a",
        },
        Charmander: {
          background: theme.navbarColor,
          boxShadow: "10px 10px 21px #94391a, -10px -10px 20px #c84d23",
        },
        Bulbasaur: {
          background: theme.navbarColor,
          boxShadow: "10px 10px 21px #224729, -10px -10px 20px #2e6137",
        },
        Squirtle: {
          background: theme.navbarColor,
          boxShadow: "10px 10px 21px #202a4c, -10px -10px 20px #2c3866",
        }}


        useEffect(() => {

        },[])

   
    return(
        <Box w='8rem' textAlign='center' borderRadius='10px' p='0.7rem'  border={location.pathname.slice(1) == title.toLowerCase() && '2px solid white'}
        style={userToken?.properties?neumorph[userToken?.properties?.name.value]:theme.neumorph} >
            <Text  fontWeight='bolder'  color='white' fontSize='1rem'>{title}</Text>
        </Box>
    )

}

export default NavItem;