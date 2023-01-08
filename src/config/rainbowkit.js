import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';


const { chains, provider } = configureChains(
  [polygonMumbai],
  [
    infuraProvider({ apiKey: process.env.REACT_APP_INFURA_ID }),
    
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


export {chains, wagmiClient}