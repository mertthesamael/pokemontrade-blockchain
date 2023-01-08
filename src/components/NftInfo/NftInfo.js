import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../store/context";

const NftInfo = ({ token }) => {
  const {theme} = useContext(UserContext)


  return (
    <Flex gap="3rem">
      <Flex
        justify="center"
        p="2rem"
        align="center"
        borderRadius='20px'
        style={theme.neumorph}
      >
        <Image
          draggable="false"
          h="90%"
          src={token?.properties?.image.value}
        ></Image>
      </Flex>
      <Flex
        p="2rem"
        borderRadius='20px'
        justifyContent="space-between"
        style={theme.neumorph}
        flexDir="column"
        gap="4rem"
      >
        <Box>
          <Text fontSize="35px" color="white" fontWeight="bolder">
            {token?.properties?.name.value}
          </Text>
          <Text
            fontSize="20px"
            color="white"
            fontWeight="bolder"
          >{`(${token?.properties?.series.value})`}</Text>
        </Box>
        <Flex minW="35rem" flexDir="column" gap="4rem">
          <Flex flexDir="column" gap="1rem">
            {token?.properties?.abilities.value.map((skill) => {
              return (
                <Flex flexDir="column">
                  <Text fontSize="25px" fontWeight="bolder" color="white">
                    {skill.name + " - " + skill.damage}
                  </Text>
                  <Text color="grey" fontStyle="italic" marginLeft="1rem">
                    {skill.description}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
          <Flex>
            <Text color="white" fontWeight="bolder" fontSize="40px">
              {"HP - " + token?.properties?.hp.value}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NftInfo;
