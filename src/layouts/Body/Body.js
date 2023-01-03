import { Flex } from "@chakra-ui/react"



const Body = ({children}) => {


    return(
        <Flex w='100%' h='100%' bgColor='#16213E'>
            {children}
        </Flex>
    )


}


export default Body;