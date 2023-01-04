import { Flex } from "@chakra-ui/react"
import Trade from "../../components/Trade/Trade"
import { useContext } from "react"
import { UserContext } from "../../store/context"




const OpenTrades = () => {
const {totalTrades} = useContext(UserContext)

    return(
        <Flex w='100%'   flexDir='column' justify='center' align='center' h='100%'>
            <Flex flexDir='column' gap='2rem' alignItems='center' w='70%' h='100%' overflowX='auto'>
            {totalTrades?.map(trade => <Trade id='2' trade={trade}/>)}
            </Flex>
            
        </Flex>
    )

}

export default OpenTrades;