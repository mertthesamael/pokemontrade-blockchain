import { Button, Flex, Image } from "@chakra-ui/react"
import { useContext } from "react";
import { UserContext } from "../../store/context";
import { ethers } from "ethers";
import abi from "../../contracts/PokemonCards.sol/PokemonCards.json"


const CreateCard = () => {

    const {userToken, userTokenId} = useContext(UserContext);
    

    const createTrade = async() => {
        console.log(userTokenId)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const signerAddr = signer.getAddress()
        const contract = new ethers.Contract("0x410Ba3C8F97f8CB4E5147d73239FFeeB34be834f", abi.abi, signer)
        try{
            await contract.setTrade(userTokenId)

        }catch(err){
            console.log(err)
        }
        
    }
    return(

        <Flex flexDir='column' w='20rem'  h='max-content'>
        <Flex w='100%' justifyContent='center'>
            <Image draggable='false' h='20rem' src={userToken?.properties.image.value}/>
        </Flex>
        <Flex w='100%' justifyContent='center'>
            <Button onClick={createTrade}>Make A Trade !</Button>
        </Flex>
        </Flex>
        )

}

export default CreateCard;