import logo from './logo.svg';
import './App.css';
import { Button, Flex, Image } from '@chakra-ui/react';
import {ethers} from "ethers"
import abi from "./contracts/PokemonCards.sol/PokemonCards.json"
import { useState } from 'react';
import axios from 'axios';
function App() {
  const [nftMetadata, setNftMetadata] = useState()
  const [nftImg, setNftImg] = useState()
  const mintNft = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract("0x445965dE15b1ee2024D3F5a3655b3D1d2d909b69", abi.abi, signer)
    await contract.mint("https://gateway.pinata.cloud/ipfs/QmeseZfShkgLos7MQgGxreaLMSq3BXtB5VtwEqEaiY1cMW/1.json")
    
  }
  const getNftData = async () => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const signer = provider.getSigner()
    // const signerAddr = signer.getAddress()
    // const contract = new ethers.Contract("0x445965dE15b1ee2024D3F5a3655b3D1d2d909b69", abi.abi, signer)
    // const nftData = await contract.getAll(signerAddr)
    // const nftMetaData = await contract.tokenURI(nftData[0].toNumber())
    await axios('https://gateway.pinata.cloud/ipfs/QmRmA8Xadw2AK2THY51JuiVGVKA3Y4fgvXR9XukNTGfqJq?filename=4.png').then(res => console.log(res))
  }
  console.log(nftMetadata)
  return (
    <Flex h='100vh' justifyContent='center' alignItems='center' bgColor='blackAlpha.900'>
      <Button onClick={mintNft}>Mint Poké Card</Button>
      <Image src={nftImg}></Image>
      
      <Button onClick={getNftData}>Get NFT Metadata</Button>
    </Flex>
  );
}

export default App;
