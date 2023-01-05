import { Box, Flex, Image, Text } from "@chakra-ui/react"




const NftInfo = ({token}) => {


    return(
        <Flex>
            <Flex>
                <Image src={token?.properties.image.value}></Image>
                
            </Flex>
            <Flex flexDir='column' gap='4rem'>
                <Box>
                    <Text>{token?.properties.name.value}</Text>
                </Box>
                <Flex flexDir='column' gap='1rem'>
                    {token?.properties.abilities.value.map((skill) =>{
                        return(

                        <Flex flexDir='column' >
                        <Text>{skill.name}</Text>
                        <Text marginLeft='1rem'>{skill.description}</Text>
                        </Flex>
                            )
                        })}
                </Flex>
            </Flex>
        </Flex>
    )

}


export default NftInfo;