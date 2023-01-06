import { Button, Flex, Grid, Image, Spinner, Text, useToast } from "@chakra-ui/react";
import TradeIcon from "../../assets/tradeIcon.svg";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../../contracts/PokemonCards.sol/PokemonCards.json";
import { useGetData } from "../../hooks/useGetData";
import { UserContext } from "../../store/context";
import styles from "./trade.module.scss";
import { NavLink, useNavigate } from "react-router-dom";

const Trade = ({ trade }) => {
  const [creatorUri, setCreatorUri] = useState();
  const [dealerUri, setDealerUri] = useState();
  const [loading, setLoading] = useState();
  const { ca, web3Init, userToken, trade:userTrade, web3Loading } = useContext(UserContext);
  const { data: creatorToken } = useGetData(creatorUri);
  const { data: dealerToken } = useGetData(dealerUri);
  const theme = {
    Pikachu: {
      borderRadius: "10px",
      background: "#E5BA73",
      boxShadow: "19px 19px 37px #c39e62, -19px -19px 37px #ffd684",
    },
    Charmander: {
      borderRadius: "10px",
      background: "#EA5C2B",
      boxShadow: "19px 19px 37px #c74e25, -19px -19px 37px #ff6a31",
    },
    Bulbasaur: {
      borderRadius: "10px",
      background: "#3C6255",
      boxShadow: "19px 19px 37px #335348, -19px -19px 37px #457162",
    },
    Squirtle: {
      borderRadius: "10px",
      background: "#064663",
      boxShadow: "19px 19px 37px #053c54, -19px -19px 37px #075172",
    },
  };
  const toast = useToast();
  const getUserNftWithAddr = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ca, abi.abi, signer);
    const nfts = await contract.getAll(trade.creator);
    const tokenUri = await contract.tokenURI(nfts[nfts.length - 1].toNumber());
    setCreatorUri(tokenUri);
    if (trade.dealerTokenId.toNumber() !== 0) {
      const dealerTokens = await contract.getAll(trade.dealer);
      const dealerTokenUri = await contract.tokenURI(
        dealerTokens[dealerTokens.length - 1].toNumber()
      );
      setDealerUri(dealerTokenUri);
    }
  };
const navigate = useNavigate()
  const checkEvents = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(ca, abi.abi, provider);
    contract.on("Bid", () => {
      setLoading(false);
      web3Init();
      navigate('/mytrade')
    });
    contract.on("TradeCreated", () => {
      setLoading(false);
      web3Init();
    });
  };

  const bidTrade = async () => {
    setLoading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddr = signer.getAddress();
    const contract = new ethers.Contract(ca, abi.abi, signer);
    const nfts = await contract.getAll(signerAddr);

    const nftId = await nfts[nfts.length - 1].toNumber();
    try {
      await contract.bidTrade(trade.tradeId.toNumber(), nftId);
    } catch (err) {
      toast({
        title: err.reason,
        status: "error",
      });
      setLoading(false)
    }
  };

  useEffect(() => {
    getUserNftWithAddr();
    checkEvents();
  }, []);
  if (trade.creatorTokenId == 0 || trade.isCompleted == true) {
    return null;
  }
  return (
    <Flex
      className={styles.trade}
      p="2rem"
      w="100%"
      h="15rem"
      justify="space-between"
    >
      <Flex h="100%" w="100%" flexDir="column">
        <Flex
          p="1rem"
          w="max-content"
          style={theme[userToken?.properties.name.value]}
          h="100%"
        >
         {web3Loading?<Spinner></Spinner>: <Image
            h="100%"
            draggable="false"
            src={creatorToken?.properties.image.value}
          />}
        </Flex>
        <Flex p="0 1.5rem">
          <Text
            color="white"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            w="100px"
          >
            {trade.creator}
          </Text>
        </Flex>
      </Flex>

      <Flex h="100%" maxW="100%" minW="10rem" justify="center">
        <Grid placeItems="center">
          {web3Loading?<Spinner></Spinner>:<Image
            filter={
              trade.isCompleted
                ? "invert(56%) sepia(91%) saturate(371%) hue-rotate(68deg) brightness(92%) contrast(80%) "
                : "invert(0.5) "
            }
            h="10rem"
            draggable="false"
            src={TradeIcon}
          />}
        </Grid>
      </Flex>
      <Flex h="100%" w="100%" align="flex-end" flexDir="column">
        {trade[1] && trade.dealerTokenId.toNumber() == 0 ? (
          <Flex justify="flex-end" h="100%" align="center">
            {loading?<Spinner/>: userToken?<Button onClick={bidTrade}>Apply Trade</Button>:
            <NavLink to='/app'>
            <Button colorScheme='red' onClick={bidTrade}>Mint Token</Button>
            </NavLink>
            }
          </Flex>
        ) : (
          <>
            <Flex
              p="1rem"
              w="max-content"
              justify="flex-end"
              style={theme[userToken?.properties.name.value]}
              h="100%"
            >
            {web3Loading?<Spinner /> : <Image
                h="100%"
                draggable="false"
                src={dealerToken?.properties.image.value}
              />}
            </Flex>
            <Flex p="0 0.8rem" justify="flex-end">
              <Text
                color="white"
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
                w="100px"
              >
                {trade.dealer}
              </Text>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Trade;
