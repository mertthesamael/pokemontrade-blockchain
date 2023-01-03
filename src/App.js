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
    await contract.mint("https://ipfs.io/ipfs/Qmerhz8zanVrWQgK5aLXU2HHYPFmrMmuLwYgcm8j7kE4UR/3.json")
    
  }
  const getNftData = async () => {
    //1 vulpix, 2arcanine, 3misdreavus, 4pikachu
    // working code await axios('https://ipfs.io/ipfs/QmeseZfShkgLos7MQgGxreaLMSq3BXtB5VtwEqEaiY1cMW/3.json').then(res => console.log(res.data))
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const signerAddr = signer.getAddress()
    const contract = new ethers.Contract("0x445965dE15b1ee2024D3F5a3655b3D1d2d909b69", abi.abi, signer)
    const nftData = await contract.getAll(signerAddr)
    const nftMetaData = await contract.tokenURI(nftData[5])
    const nftImage = await axios(nftMetaData).then(res => res.data.properties.image.value)
    await setNftImg(nftImage)
    
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
