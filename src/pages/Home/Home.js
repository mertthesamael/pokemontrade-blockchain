import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".bg").style.opacity = 1;
    }, 1);
  }, []);
  return (
    <Flex
      pos="relative"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      bgColor="blackAlpha.900"
    >
      <Box
        className="bg"
        transition="all 2s ease"
        zIndex="1"
        opacity="0"
        pos="absolute"
        bgImage={`url(https://cdn.discordapp.com/attachments/1034297248516935720/1059672126463938621/Mert_pokemons_blockchain_a0c8f490-5a4a-4234-977e-beafb2448c39.png)`}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPos="center"
        w="100%"
        h="100%"
      ></Box>
      <Flex
        h="100vh"
        w="100%"
        background="linear-gradient(360deg, rgba(32,32,32,1) 0%, rgba(0,0,0,0) 100%)"
        pos="relative"
        zIndex={"2"}
        justify="center"
        align="center"
      >
        <Flex
          h="100%"
          w="100%"
          justifyContent="center"
          alignItems="center"
          gap="5rem"
          flexDir="column"
          textAlign='center'
        >
          <Text color="white" fontSize="70px" fontFamily="Concert One">
            Pokémon TCG Blockchain
          </Text>
          <Box w="60%" textAlign="center">
            <Text color="white" fontSize="23px">
              Hey There, This Is Merto and Here Is My Project That I Made In
              Order To Complete ParibuHub Smart Contract - Solidity Developming
              Practicum. This DaPP works on Polygon-Mumbai Testnet. Also, This
              Is A Fan Made Project And Do Not Have Any Connection With Pokémon
              Company. No Copyright Infringement Intended.
            </Text>
          </Box>
          {/* <Button onClick={mintNft}>Mint Poké Card</Button> */}
          <Flex gap="2rem">
            <NavLink to="/app">
              <Button
                p="1.5rem"
                border="1px solid white"
                bg="none"
                color="white"
                backdropFilter="blur(6px)"
                boxShadow="0 0px 5px 0px white"
                background="rgba( 255, 255, 255, 0.05 )"
                _hover={{ background: "white", color: "black" }}
              >
                Launch App
              </Button>
            </NavLink>

            {/* <Button onClick={getNftData}>Get NFT Metadata</Button> */}
              <a href="https://www.linkedin.com/in/mertenercan/" target={'_blank'}>
            <Button  p="1.5rem" border="2px solid white">

              Contact Me
            </Button>
              </a>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
