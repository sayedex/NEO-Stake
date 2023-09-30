import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";
import { bsc,bscTestnet,goerli ,arbitrum,polygonMumbai,polygon} from "wagmi/chains";

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

export const isdevsMode= process.env.NODE_ENV == "development";

const chains = [isdevsMode?polygonMumbai:polygonMumbai];

export const client = createClient(
    getDefaultClient({
      appName: "NEO stake",
      appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
      alchemyId,
      chains
    }),
  );
