import { Flex, Image, Text } from "@chakra-ui/react"
import TradeIcon from "../../assets/tradeIcon.svg";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../../contracts/PokemonCards.sol/PokemonCards.json"
import { useGetData } from "../../hooks/useGetData";

const Trade = ({id,trade}) => {
    const [creatorUri, setCreatorUri] = useState()
    
    const {data:creatorToken} = useGetData(creatorUri)

    const getUserNftWithAddr= async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract("0x4452EFEa8daeEd3aD501f154D5a77648Baa6Ce07", abi.abi, signer)
        const nfts = await contract.getAll(trade.creator)
        const tokenUri = await contract.tokenURI(nfts[nfts.length-1].toNumber())
        setCreatorUri(tokenUri)
    }
    
    useEffect(() => {
        getUserNftWithAddr()
    },[])
    const cardStyle = {
        1:{img:"https://ipfs.io/ipfs/QmU2ynpBSGYta2Cwy3D1THL7nTLmB8m6rEVDmdstVemgdY",color:'aqua'},
        2:{img:"https://ipfs.io/ipfs/QmX4TsCKbHWdNBAgdhe4YFutgCYdM4XPVFHyAh5TNsUR2F",color:'#B3FFAE'},
        3:{img:"https://ipfs.io/ipfs/QmRChK8DtEMpir3E6MjBrvioax1HrkLfRbraqnnqtKQGFW",color:'orange'},
        4:{img:"https://ipfs.io/ipfs/QmTKeiEdQ5mZhq5SjYCJUHyHHrTFGb44idengnEbjzU7oM",color:'yellow'}
        }

    return(
        <Flex w='70%' h='15rem' justify='space-between' bgColor={'red'}>
            <Flex h='100%' w='100%' flexDir='column' bgColor='blue'>
                <Flex h='100%' w='100%'>
                <Image draggable='false' src={creatorToken?.properties.image.value}/>
                </Flex>
                <Flex>
                    <Text>{trade.creator}</Text>
                </Flex>
               
            </Flex>
                <Flex h='100%' w='100%' justify='center' bgColor='blue'>
            <Image draggable='false' src={TradeIcon}/>

            </Flex>
            <Flex h='100%' w='100%' justifyContent='flex-end' bgColor='blue'>
            <Image draggable='false' src={cardStyle[id].img}/>

            </Flex>
        </Flex>
    )

}

export default Trade;