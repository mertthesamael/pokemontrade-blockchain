import { Flex } from "@chakra-ui/react"
import Trade from "../../components/Trade/Trade"
import { useContext } from "react"
import { UserContext } from "../../store/context"




const OpenTrades = () => {
const {totalTrades} = useContext(UserContext)
console.log(totalTrades)
    return(
        <Flex w='100%' gap='2rem' flexDir='column' justify='center' align='center' h='100%'>
            {totalTrades?.map(trade => <Trade id='2' trade={trade}/>)}
            
        </Flex>
    )

}

export default OpenTrades;