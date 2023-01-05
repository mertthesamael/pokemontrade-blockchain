import { Flex } from "@chakra-ui/react";




const Wrapper = ({children}) => {

    return(
        <Flex h='100vh' w='100vw'>
            {children}
        </Flex>
        
    )

}

export default Wrapper;