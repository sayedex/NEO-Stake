import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { NFT } from "../../config";
import { nftdata } from "../../typeing";
import axios from "axios";
import { hexToInt } from "../../utils/format";
import {
  getContractInstance,
  getNFTContractInstanceforhook,
} from "../../utils/Contracthelper";

const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "X-API-Key":
      "hfFDDgyJiGcA93sEfRWQF61kqPD66rc7etsRDlEjjOZxQ3LVNZKMYRyB2Na3vx6f",
  },
};

//https://deep-index.moralis.io/api/v2/${user}/nft?chain=polygon&format=decimal&limit=100&disable_total=true&token_addresses%5B0%5D=${process.env.nftaddress}&media_items=false


export const GetallNFTBYwallet = createAsyncThunk(
  "GetallNFTBYwallet",
  async (parms: {   
     user: string | null | undefined;
    nftaddress: any;
    provider: any;
    pool: any;}, { dispatch }) => {
    const output = await axios.get(
      `https://deep-index.moralis.io/api/v2/${parms.user}/nft?chain=mumbai&format=decimal&limit=100&disable_total=true&token_addresses%5B0%5D=${parms.nftaddress}&media_items=false`,
      options
    );
    const nftArrayFromAPI = output.data.result;
    return nftArrayFromAPI;
  }
);





export const getStakedTokens = createAsyncThunk(
  "getStakedTokens",
  async (
    parms: { user: string | null | undefined; contract: string; nft: any },
    { dispatch }
  ) => {
    const instance = await getContractInstance(parms.contract);
    const yourDepositToken = await instance.getStakedTokens(parms.user);
    const getNftstate:any = NFT.filter((e)=>{
    return e.nftcontract ==parms.nft
     });

    const yourDeposit = yourDepositToken.map((e: any) => ({
      token_id: hexToInt(e.tokenId),
      image: `https://dweb.link/ipfs/${getNftstate[0].thCID}/${getNftstate[0].isSame?getNftstate[0].name:hexToInt(e.tokenId)}.png`, // Replace "asas" with the actual image URL or source
    }));

    return yourDeposit;
  }
);
