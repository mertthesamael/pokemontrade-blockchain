import { Button, Flex, Spinner } from "@chakra-ui/react"
import Trade from "../Trade/Trade"
import { useContext, useEffect, useState } from "react"
import { ethers } from "ethers"
import abi from "../../contracts/PokemonCards.sol/PokemonCards.json"
import { UserContext } from "../../store/context"



const UserTrade = () => {


    const {totalTrades, ca} = useContext(UserContext)
   
    const [trade, setTrade] = useState(false)
    const getUserTrade = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const signerAddr = signer.getAddress()
        totalTrades?.map(async (trade)=> {
            if(trade.dealer || trade.creator == signerAddr){
               setTrade(trade)
            }
        })
    }
    const applyTrade = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract =  new ethers.Contract(ca, abi.abi, signer)
        await contract.approveTrade(trade.tradeId).then(()=> console.log(trade))
    }

    const finalizeTrade = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract =  new ethers.Contract(ca, abi.abi, signer)
        await contract.finalizeTrade(trade.tradeId)
    }
  
    useEffect(() => {
        getUserTrade()
    },[totalTrades])
    return(
        <Flex w='80%' h='28rem' flexDir='column' bgColor='red'>
            {
                trade?
                <Trade trade={trade}></Trade> 
                :<Spinner/>
            }
            <Flex w='100%' h='8rem'>

                <Flex w='100%' h='100%' align='center'>
                <Button onClick={applyTrade}>Creator Apply</Button>
                </Flex>
                <Flex w='100%' h='100%' justify='center' align='center'>
                <Button onClick={finalizeTrade}>TRADE !</Button>
                    
                </Flex>
                <Flex w='100%' h='100%' justify='flex-end' align='center'>
                <Button onClick={applyTrade}>Dealer Apply</Button>
                    
                </Flex>

            </Flex>

        </Flex>
    )

}


export default UserTrade;