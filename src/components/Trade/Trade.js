import { Button, Flex, Grid, Image, Text, useToast } from "@chakra-ui/react";
import TradeIcon from "../../assets/tradeIcon.svg";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../../contracts/PokemonCards.sol/PokemonCards.json";
import { useGetData } from "../../hooks/useGetData";
import { UserContext } from "../../store/context";

const Trade = ({ trade }) => {
  const [creatorUri, setCreatorUri] = useState();
  const [dealerUri, setDealerUri] = useState();
  const [loading, setLoading] = useState()
  const { ca, web3Init } = useContext(UserContext);
  const { data: creatorToken } = useGetData(creatorUri);
  const { data: dealerToken } = useGetData(dealerUri);
  const toast = useToast()
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

  const checkEvents = () => {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      ca,
      abi.abi,
      provider
    );
    contract.on("Bid", () => {
        setLoading(false);
        web3Init()
    });
    contract.on("TradeCreated", () => {
        setLoading(false);
        web3Init()
    });
  };

  const bidTrade = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddr = signer.getAddress();
    const contract = new ethers.Contract(ca, abi.abi, signer);
    const currentTrade = await contract.trades(trade.tradeId.toNumber());
    const nfts = await contract.getAll(signerAddr);

    const nftId = await nfts[nfts.length - 1].toNumber();
try{

    await contract.bidTrade(trade.tradeId.toNumber(), nftId);
}catch(err){

    toast({
        title:err.reason,
        status:'error'
    })
}
  };

  useEffect(() => {
    getUserNftWithAddr();
    checkEvents()
  }, []);

  return (
    <Flex w="100%" h="15rem" justify="space-between">
      <Flex h="100%" w="100%" flexDir="column">
        <Flex h="100%" w="100%">
          <Image draggable="false" src={creatorToken?.properties.image.value} />
        </Flex>
        <Flex>
          <Text>{trade.creator}</Text>
        </Flex>
      </Flex>

      <Flex h="100%" maxW="100%" minW="10rem" justify="center">
        <Grid placeItems="center">
          <Image h="10rem" draggable="false" src={TradeIcon} />
        </Grid>
      </Flex>
      <Flex h="100%" w="100%" flexDir="column">
        {trade[1] && trade.dealerTokenId.toNumber() == 0 ? (
          <Flex justify="flex-end" h="100%" align="center">
            <Button onClick={bidTrade}>Apply Trade</Button>
          </Flex>
        ) : (
          <>
            <Flex w="100%" justify="flex-end" h="100%">
              <Image
                draggable="false"
                src={dealerToken?.properties.image.value}
              />
            </Flex>
            <Flex justify="flex-end">
              <Text>{trade.dealer}</Text>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Trade;
