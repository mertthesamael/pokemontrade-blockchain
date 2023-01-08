import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public'
import abi from "../contracts/PokemonCards.sol/PokemonCards.json"


const { chains, provider } = configureChains(
  [polygonMumbai],
  [
    infuraProvider({ apiKey: 'e76969931fd84d05bf2a9bc780710310' })

    
  ]
  
);

const { connectors } = getDefaultWallets({
    appName: 'Pokemon TCG Blockchain',
    chains
  });

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})

const contractConfig = {
  addressOrName:'0xb8ACE684Cb0290fe5F42B602fe01B238dfF804F7',
  contractInterface:abi.abi
  
}

export {chains, wagmiClient,provider, contractConfig}