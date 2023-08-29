import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { bsc,bscTestnet,goerli ,arbitrum,polygonMumbai} from "wagmi/chains";
import { ethers } from "ethers";


const RPC_URL = 'https://cronos.blockpi.network/v1/rpc/public';
export const provider = new ethers.providers.JsonRpcProvider(RPC_URL)



// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)

const alchemyId = "Tv277_RjwkXDuii_WGiG_X8RL-T56yyG";
//  up client
//
const chains = [polygonMumbai];

export const client = createClient(
    getDefaultClient({
      appName: "minter",
      alchemyId,
      chains
    }),
  );

// Pass client to React Context Provider