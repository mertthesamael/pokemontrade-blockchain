import { Box, Flex } from "@chakra-ui/react"
import NftCard from "../../components/NftCard/NftCard";


const Main = () => {

    return(
        <Flex overflow='auto' justify='center' align='center' h='100%' w='100%'>
            <Flex justify='center' w='90%' columnGap='10rem' rowGap='8rem' flexWrap='wrap'>
                
            <NftCard id='1'/>
            <NftCard id='2'/>
            <NftCard id='3'/>
            <NftCard id='4'/>
            </Flex>
        </Flex>
    )

}


export default Main;