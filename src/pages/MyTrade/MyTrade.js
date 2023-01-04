import { Flex } from "@chakra-ui/react"
import UserTrade from "../../components/UserTrade/UserTrade";



const MyTrade = () => {

    return(
        <Flex justify="center" align="center" w="100%" h="100%">
            <UserTrade></UserTrade>
        </Flex> 
    )

}

export default MyTrade;