import { Contract } from '@ethersproject/contracts';
import StakingABI from "../config/ABI/Staking.json"
import ercabi from "../config/ABI/erc721.json";
import buycontract from "../config/ABI/Buycontract.json";
import erc20 from "../config/ABI/erc20.json"
import { provider } from './providerweb3';
import { nftdata } from '../typeing';
import { Listinginfo } from '../typeing';
import { ethers } from 'ethers';
import { NeoBoxcontract, Purchasecontract} from '../config';

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

export const getNeoBoxtokeninstance = (isUsercall:boolean,library?:any) =>{
	if(isUsercall){
		const contract = new Contract(NeoBoxcontract, ercabi.abi, library);
		return contract;
	}else{
		const contract = new Contract(NeoBoxcontract, erc20.abi, provider);
		return contract;
	}
}

export const getBuyContractinstance = (isUsercall:boolean,library?:any) =>{
	if(isUsercall){
		const contract = new Contract(Purchasecontract, buycontract.abi, library);
		return contract;
	}else{
		const contract = new Contract(Purchasecontract, erc20.abi, provider);
		return contract;
	}
}

export const ConvertEthTonormal = async(amount:any)=>{
	const _amount  = await ethers.utils.formatUnits(
		amount,
		18
	  );
	return (_amount)
}

export const FormatEther =  async(amount:any)=>{
	const _amount  = await ethers.utils.parseUnits(amount.toString());
	
	return (_amount.toString())
}



export function filterNFTsForStake(nftData: nftdata[], allowedAddress: any): any[] {
	if(allowedAddress) {
		return nftData.filter((nft) => nft.token_address.toLowerCase() == allowedAddress.toLowerCase());
	}
	return []
  }


  //calculate daily reward 
  export function calculatePerDayReward(rewardsPerUnitTime:string,timeUnit:string): string {
	const secondsInDay = 24 * 60 * 60; // Number of seconds in a day
	const rewardsPerDay = (Number(rewardsPerUnitTime) * secondsInDay) / Number(timeUnit);
	return rewardsPerDay.toFixed(0);
  }
  
  // gettig all listing info..
  export async function getListingDetails(tokenId: number,contractaddress:string) {
	const contract = new Contract(contractaddress, buycontract.abi, provider);
	const result = await contract.getListing(tokenId);
	const price = await ethers.utils.formatUnits(
		result[0],
		18
	  );
	return {
	  value: parseInt(price),
	  maxLimit: result[1].toString(),
	  totalBuy: result[2].toString(),
	  collectionAddress: result[3],
	  pause: result[4],
	};
  }