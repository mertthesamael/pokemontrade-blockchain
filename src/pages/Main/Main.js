import { Box, Flex, Image, Text } from "@chakra-ui/react";
import NftCard from "../../components/NftCard/NftCard";
import Tilt from "react-parallax-tilt";
import styles from "./main.module.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/context";
//Name will replaced with MINT - maybe
const Main = () => {
  const [shadowY, setShadowY] = useState("");
  const [shadowX, setShadowX] = useState("");
  const { userToken,web3Init } = useContext(UserContext);
  //Function for tracking mouse position in order to develop dynamic shadow.
  const mouseTracker = (e) => {
    setShadowY(
      e.tiltAngleYPercentage < 0
        ? Math.abs(e.tiltAngleYPercentage) * 0.1
        : -Math.abs(e.tiltAngleYPercentage) * 0.1
    );

    setShadowX(
      e.tiltAngleXPercentage < 0
        ? -Math.abs(e.tiltAngleXPercentage) * 0.1
        : Math.abs(e.tiltAngleXPercentage) * 0.1
    );
  };
  const cardStyle = {
    Squirtle: { img: "Squirtle", color: "aqua" },
    Bulbasaur: { img: "Bulbasaur", color: "#B3FFAE" },
    Charmander: { img: "Charmander", color: "orange" },
    Pikachu: { img: "Pikachu", color: "yellow" },
  };
  useEffect(() => {
    web3Init()
  },[])
  
  return (
    <Flex
      justify="center"
      flexwWrap="wrap"
      overflow="auto"
      flexDir="column"
      align="center"
      h="100%"
      w="100%"
    >
      <Flex textAlign='center' pos="relative" top="-8rem">
        <Text color="white" fontWeight="bolder" fontSize="25px">
          Welcome Trainer ! Choose your Pokémon Wisely, You Have Only 1 Chance !
        </Text>
      </Flex>
      <Flex
        justify="center"
        w="90%"
        h="20rem"
        columnGap="10rem"
        rowGap="8rem"
        flexWrap="wrap"
      >
        <NftCard id="1" />
        <NftCard id="2" />

        <NftCard id="3" />
        <NftCard id="4" />
      </Flex>

      <Flex
        style={userToken?.properties && { visibility: "visible" }}
        visibility="hidden"
        transform="all 1s ease"
        pos="absolute"
        justify="center"
        align="center"
        w="100%"
        h="100%"
        bgColor="blackAlpha.800"
        backdropFilter="blur(4px)"
      >
        <Flex>
          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.45}
            glarePosition="all"
            glareBorderRadius="20px"
            onMove={mouseTracker}
            scale="1.5"
            style={{ borderRadius: "10px", position: "relative" }}
            className={styles.tilt}
          >
            <Box
              pos="absolute"
              zIndex="-1"
              h="90%"
              left="0"
              right="0"
              top="1.3rem"
              margin="0 auto"
              w="90%"
              boxShadow={`${shadowY}px ${shadowX}px 20px 25px ${
                cardStyle[userToken?.properties?.name.value]?.color
              }`}
              className={styles.dynamicShadow}
            ></Box>
            <Image
              draggable="false"
              src={userToken?.properties?.image.value}
            ></Image>
          </Tilt>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Main;
