import { Box, Button, Image, Spinner, useToast } from "@chakra-ui/react";
import Tilt from "react-parallax-tilt"
import styles from "./nftcard.module.scss"
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../../contracts/PokemonCards.sol/PokemonCards.json"
import { UserContext } from "../../store/context";

const NftCard = ({id}) => {

    const [shadowY, setShadowY] = useState("")
    const [shadowX, setShadowX] = useState("")
    const {ca, web3Init} = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState(false)
    const toast = useToast()

    const checkEvents = () => {
        setLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          ca,
          abi.abi,
          provider
        );
        contract.on("Minted", () => {
            setLoading(false);
            web3Init()
            setSelected(true)
        });
      };
    //Function for tracking mouse position in order to develop dynamic shadow.
    const mouseTracker = (e)=> {
        setShadowY(e.tiltAngleYPercentage<0?
            Math.abs(e.tiltAngleYPercentage)
            *0.1:-Math.abs(e.tiltAngleYPercentage)*0.1)
    
            setShadowX(e.tiltAngleXPercentage<0?
                -Math.abs(e.tiltAngleXPercentage)
                *0.1:Math.abs(e.tiltAngleXPercentage)*0.1)
    
    }

    const mintNft = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(ca, abi.abi, signer)
        try{

            await contract.mint(`https://ipfs.io/ipfs/QmTJe7S9PEzgfgXaN9ZYb19m9y7kvPR6Be1qthKSrKyEVV/${id}.json`).then(() => checkEvents())
        
        }catch(err){
            console.log(err)
            toast({
                title:err.reason,
                status:'error'
            })
        }
      }
 
    const cardStyle = {
        1:{img:"https://ipfs.io/ipfs/QmU2ynpBSGYta2Cwy3D1THL7nTLmB8m6rEVDmdstVemgdY",color:'aqua'},
        2:{img:"https://ipfs.io/ipfs/QmX4TsCKbHWdNBAgdhe4YFutgCYdM4XPVFHyAh5TNsUR2F",color:'#B3FFAE'},
        3:{img:"https://ipfs.io/ipfs/QmRChK8DtEMpir3E6MjBrvioax1HrkLfRbraqnnqtKQGFW",color:'orange'},
        4:{img:"https://ipfs.io/ipfs/QmTKeiEdQ5mZhq5SjYCJUHyHHrTFGb44idengnEbjzU7oM",color:'yellow'}
        }


    return(
        <Box className={styles.nftCard} display='flex' gap='2rem' flexDir='column'  h='auto' borderRadius='15px' p='2rem' w='15rem' backdropFilter='blur(6px)' color='white' boxShadow='0 0px 5px 0px white' background='rgba( 255, 255, 255, 0.05 )' _hover={{color:'black'}}>
            {loading && <Spinner></Spinner>}
            <Box pos='relative' display='flex' h='15rem' justifyContent='center'>
            <Tilt className={styles.nftImg} onMove={mouseTracker} scale='1.4'>
                <Box pos='absolute' h='70%' left='0' right='0' top='1.3rem' margin='0 auto' w='70%' boxShadow={`${shadowY}px ${(shadowX)}px 20px 25px ${cardStyle[id].color}`} className={styles.dynamicShadow}></Box>

            <Image id='img' draggable='false' transition='all 1s ease' pos='relative' top='0' _hover={{top:'-2rem'}} h='100%'src={cardStyle[id].img}></Image>
            </Tilt>
            </Box >
            <Box display='flex' justifyContent='center' h='100%'>
                <Button onClick={mintNft} backdropFilter='blur(6px)' color='white' boxShadow='0 0px 5px 0px white' background='rgba( 255, 255, 255, 0.05 )' _hover={{background:cardStyle[id].color, color:'black',transform:'scale(1.1)'}}>
                    I Choose You !
                </Button>
            </Box>
        </Box>
    )
    


}


export default NftCard;