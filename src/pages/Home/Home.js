import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import {ethers} from "ethers"
import abi from "../../contracts/PokemonCards.sol/PokemonCards.json"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';



const Home = () => {
    const [nftMetadata, setNftMetadata] = useState()
    const [nftImg, setNftImg] = useState()
    
    const getNftData = async () => {
      //1 vulpix, 2arcanine, 3misdreavus, 4pikachu
      // working code await axios('https://ipfs.io/ipfs/QmeseZfShkgLos7MQgGxreaLMSq3BXtB5VtwEqEaiY1cMW/3.json').then(res => console.log(res.data))
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const signerAddr = signer.getAddress()
      const contract = new ethers.Contract("0xAd9DAC734E5895AC35eDBE842C19130f4B4Ce435", abi.abi, signer)
      const nftData = await contract.getAll(signerAddr)
      const nftMetaData = await contract.tokenURI(nftData[5])
      const nftImage = await axios(nftMetaData).then(res => res.data.properties.image.value)
      await setNftImg(nftImage)
      
    }
    console.log(nftMetadata)
    useEffect(() => {
      setTimeout(() => {
        document.querySelector('.bg').style.opacity = 1
        
      }, 1);
    },[])
    return(
        <Flex pos='relative' h='100vh' justifyContent='center' alignItems='center' bgColor='blackAlpha.900'>
        <Box className='bg' transition='all 2s ease' zIndex='1' opacity='0' pos='absolute' bgImage={`url(https://cdn.discordapp.com/attachments/1034297248516935720/1059672126463938621/Mert_pokemons_blockchain_a0c8f490-5a4a-4234-977e-beafb2448c39.png)`}  bgRepeat='no-repeat' bgSize='cover' bgPos='center' w='100%' h='100%'>
        </Box>
        <Flex h='100vh' w='100%' background='linear-gradient(360deg, rgba(32,32,32,1) 0%, rgba(0,0,0,0) 100%)' pos='relative' zIndex={'2'} justify='center' align='center'>
      
        <Flex h='100%' w='100%' justifyContent='center' alignItems='center' gap='5rem' flexDir='column'>
        <Text color='white' fontSize='70px' fontFamily='Concert One'>Pokémon TCG Blockchain</Text>
        <Box w='60%' textAlign='center'>
        <Text color='white'  fontSize='23px' >Hey There, This Is Merto and Here Is My Project That I Made In Order To Complete ParibuHub Smart Contract - Solidity Developming Practicum. This DaPP works on Polygon-Mumbai Testnet. Also, This Is A Fan Made Project And Do Not Have Any Connection With Pokémon Company. No Copyright Infringement Intended.</Text>
        </Box>
        {/* <Button onClick={mintNft}>Mint Poké Card</Button> */}
        <Flex gap='2rem'>
        <NavLink to='/app'>
        <Button p='1.5rem' border='1px solid white' bg='none' color='white' backdropFilter='blur(6px)'  boxShadow='0 0px 5px 0px white' background='rgba( 255, 255, 255, 0.05 )' _hover={{background:'white', color:'black'}
    
      }>Launch App</Button>
        </NavLink>
        <Image src={nftImg}></Image>
        
        {/* <Button onClick={getNftData}>Get NFT Metadata</Button> */}
        <Button p='1.5rem' border='2px solid white' >Contact Me</Button>
        </Flex>
        </Flex>
        </Flex>
      </Flex>
        
    )

}

export default Home