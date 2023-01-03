import { Flex } from "@chakra-ui/react";




const Wrapper = ({children}) => {

    return(
        <Flex h='100vh'>
            {children}
        </Flex>
        
    )

}

export default Wrapper;