
import { ethers } from "ethers";
export const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_PROVIDER_RPC)

