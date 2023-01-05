import { Button, Flex, Image, useToast } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/context";
import { ethers } from "ethers";
import abi from "../../contracts/PokemonCards.sol/PokemonCards.json"


const CreateCard = () => {

    const {userToken, userTokenId, ca, web3Init} = useContext(UserContext);
    const toast = useToast()
    const [loading, setLoading] = useState(false)

    const createTrade = async() => {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const signerAddr = signer.getAddress()
        const contract = new ethers.Contract(ca, abi.abi, signer)
        try{
            await contract.setTrade(userTokenId)

        }catch(err){
            toast({
                title:err.reason,
                status:'error'
            })
        }
        
    }
    const checkEvents = () => {
        setLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          ca,
          abi.abi,
          provider
        );
        contract.on("TradeCreated", () => {
            setLoading(false);
            web3Init()
        });
      };

      useEffect(() => {
        checkEvents()
      },[])
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