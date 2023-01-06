import { Box, Flex, Image, Text } from "@chakra-ui/react";

const NftInfo = ({ token }) => {
  const theme = {
    Pikachu: {
      borderRadius: "20px",
      background: "#E5BA73",
      boxShadow: "19px 19px 37px #c39e62, -19px -19px 37px #ffd684",
    },
    Charmander: {
      borderRadius: "20px",
      background: "#EA5C2B",
      boxShadow: "19px 19px 37px #c74e25, -19px -19px 37px #ff6a31",
    },
    Bulbasaur: {
      borderRadius: "20px",
      background: "#3C6255",
      boxShadow: "19px 19px 37px #335348, -19px -19px 37px #457162",
    },
    Squirtle: {
      borderRadius: "20px",
      background: "#064663",
      boxShadow: "19px 19px 37px #053c54, -19px -19px 37px #075172",
    },
  };

  return (
    <Flex gap="3rem">
      <Flex
        justify="center"
        p="2rem"
        align="center"
        style={theme[token?.properties.name.value]}
      >
        <Image
          draggable="false"
          h="90%"
          src={token?.properties.image.value}
        ></Image>
      </Flex>
      <Flex
        p="2rem"
        justifyContent="space-between"
        style={theme[token?.properties.name.value]}
        flexDir="column"
        gap="4rem"
      >
        <Box>
          <Text fontSize="35px" color="white" fontWeight="bolder">
            {token?.properties.name.value}
          </Text>
          <Text
            fontSize="20px"
            color="white"
            fontWeight="bolder"
          >{`(${token?.properties.series.value})`}</Text>
        </Box>
        <Flex minW="35rem" flexDir="column" gap="4rem">
          <Flex flexDir="column" gap="1rem">
            {token?.properties.abilities.value.map((skill) => {
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
              {"HP - " + token?.properties.hp.value}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NftInfo;
