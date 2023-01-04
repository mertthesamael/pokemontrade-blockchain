import { Box, Flex, Image } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "../../contracts/PokemonCards.sol/PokemonCards.json"
import axios from "axios";



const MyNft = () => {
    const [nftImage, setNftImg] = useState()
    const getUserNft = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const signerAddr = signer.getAddress()
        const contract = new ethers.Contract("0xAd9DAC734E5895AC35eDBE842C19130f4B4Ce435", abi.abi, signer)
        const nfts = await contract.getAll(signerAddr)
        const tokenUri = await contract.tokenURI(nfts[nfts.length-1].toNumber())
        const nftImg = await axios(tokenUri).then(res => res.data.properties.image.value)
        setNftImg(nftImg)
        
        
    }
    useEffect(() => {
        getUserNft()
    },[])
    return(
        <Flex justify='center' align='center' w='100%' h='100%'>
            <Flex h='30rem' justify='center' bgColor='red' w='20rem'>
            <Image h='25rem' src={nftImage}></Image>
            </Flex>
        </Flex>
    )

}

export default MyNft;