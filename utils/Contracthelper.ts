import { Contract } from '@ethersproject/contracts';
import StakingABI from "../config/ABI/Staking.json"
import ercabi from "../config/ABI/erc721.json";
import { provider } from './providerweb3';
import { nftdata } from '../typeing';
export const getContractInstance = (contractaddress:string) => {
	const contract = new Contract(contractaddress, StakingABI.abi, provider);

	return contract;
};
export const getContractInstanceforhook = (contractaddress:string,library:any,account:any) => {

	const contract = new Contract(contractaddress, StakingABI.abi, library);
	return contract;
};


export const getNFTContractInstanceforhook = (contractaddress:string,account:any,library:any) => {
	const contract = new Contract(contractaddress, ercabi.abi, library);
	return contract;
};

export function filterNFTsForStake(nftData: nftdata[], allowedAddress: any): any[] {
	if(allowedAddress) {
		return nftData.filter((nft) => nft.token_address.toLowerCase() == allowedAddress.toLowerCase());
	}
	return []
  }