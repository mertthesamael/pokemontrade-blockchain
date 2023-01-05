import { Button, Flex, Spinner, useToast } from "@chakra-ui/react"
import Trade from "../Trade/Trade"
import { useContext, useEffect, useState } from "react"
import { ethers } from "ethers"
import abi from "../../contracts/PokemonCards.sol/PokemonCards.json"
import { UserContext } from "../../store/context"



const UserTrade = () => {


    const {ca, trade, web3Init} = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const applyTrade = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract =  new ethers.Contract(ca, abi.abi, signer)
        try{

            await contract.approveTrade(trade.tradeId).then(()=> console.log(trade))
        }catch(err){
            toast({
                title:err.reason,
                status:'error'
            })
        }
    }

    const finalizeTrade = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract =  new ethers.Contract(ca, abi.abi, signer)
        await contract.finalizeTrade(trade.tradeId)
    }
    const checkEvents = () => {
        setLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          ca,
          abi.abi,
          provider
        );
        contract.on("CreatorConfirmed", () => {
            setLoading(false);
            web3Init()
        });
        contract.on("DealerConfirmed", () => {
            setLoading(false);
            web3Init()
        });
        contract.on("FinalizeTrade", () => {
            setLoading(false);
            web3Init()
        });
      };

      useEffect(() => {
        checkEvents()
      },[])
    return(
        <Flex w='80%' h='28rem' flexDir='column'>
            {
                trade?
                <Trade trade={trade}></Trade> 
                :<Spinner/>
            }
            <Flex w='100%' h='8rem'>

                <Flex w='100%' h='100%' align='center'>
                <Button onClick={applyTrade}>Creator Apply</Button>
                {trade && trade.creatorConfirm ? 'CONFIRMED': 'NEEDS TO BE CONFIRMED'}

                </Flex>
                <Flex w='100%' h='100%' justify='center' align='center'>
                <Button onClick={finalizeTrade}>TRADE !</Button>
                    
                </Flex>
                <Flex w='100%' h='100%' justify='flex-end' align='center'>
                <Button onClick={applyTrade}>Dealer Apply</Button>
                {trade && trade.dealerConfirm ? 'CONFIRMED': 'NEEDS TO BE CONFIRMED'}
                    
                </Flex>

            </Flex>

        </Flex>
    )

}


export default UserTrade;