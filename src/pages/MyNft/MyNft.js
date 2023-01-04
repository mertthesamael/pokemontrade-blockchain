import { Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../store/context";

const MyNft = () => {
  const { userToken, loading } = useContext(UserContext);

  return (
    <Flex justify="center" align="center" w="100%" h="100%">
      <Flex
        h="30rem"
        flexDir="column"
        align="center"
        justify="center"
        w="20rem"
      >
        {loading ? (
          <Spinner></Spinner>
        ) : (
          <>
            <Flex>
              <Image h="25rem" src={userToken?.properties.image.value}></Image>
            </Flex>
            <Flex>
              <Text color="white" fontSize="5rem">
                {userToken?.properties.name.value}
              </Text>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default MyNft;
