export interface Pool {
    id:number,
    name: string;
    header: string;
    type?: string;
    rate?: any;
    nftcontract: string;
    totaldeposit?: any;
    yourdeposit?: any;
    unclaimed?: string;
    typeimg?:any,
    limit:boolean,
    min:number,
    max:number,
    headerIMG:string
    rewardnft?:rewardnft[]
    poolId:number,
    staked?:number,
    nftBalance?:number,
    poolloading:boolean,
    isBuynft:boolean
  }

  export type rewardnft = {
    name : string,
    cid:string,
    tokenid:number,
    imgName?:string

  }
  export type nftdata ={
    token_id:string,
    metadata:any,
    name:string,
    symbol:string,
    token_address:string
    token_uri:string
}

export type Listinginfo = {
  value: number;
  maxLimit: number;
  totalBuy: number;
  collectionAddress: string;
  pause: boolean;
}

