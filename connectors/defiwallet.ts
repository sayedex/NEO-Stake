import { DeFiWeb3Connector } from "@deficonnect/web3-connector";

 let DeFiWallet;

  if (typeof document !== 'undefined') {
     DeFiWallet = new DeFiWeb3Connector({
      appName:"asasas",
      // supportedChainIds: [1],
      chainType: "eth", // only support 'eth' for DeFiWeb3Connector
      chainId: "25",
      rpcUrls: {
        1: "https://mainnet.infura.io/v3/INFURA_API_KEY",
        25: "https://evm-cronos.crypto.org/",
      },
    });
 }


export default DeFiWallet;