import { Flex } from "@chakra-ui/react";




const Wrapper = ({children}) => {

    return(
        <Flex flexDir='column' h='100vh' w='100vw'>
            {children}
        </Flex>
        
    )

}

export default Wrapper;