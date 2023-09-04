export interface Pool {
    id:number,
    name: string;
    header: string;
    type?: string;
    rate?: any;
    contract:string
    nftcontract?: string;
    totaldeposit?: any;
    yourdeposit?: any;
    unclaimed?: string;
    typeimg?:any,
    limit:boolean,
    min:number,
    max:number,
    headerIMG:string
  }

  export type nftdata ={
    token_id:string,
    metadata:any,
    name:string,
    symbol:string,
    token_address:string
    token_uri:string
}