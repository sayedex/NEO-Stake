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

//hfFDDgyJiGcA93sEfRWQF61kqPD66rc7etsRDlEjjOZxQ3LVNZKMYRyB2Na3vx6f

const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "X-API-Key":
      process.env.NEXT_PUBLIC_moraliskey,
  },
};

//https://deep-index.moralis.io/api/v2/${user}/nft?chain=polygon&format=decimal&limit=100&disable_total=true&token_addresses%5B0%5D=${process.env.nftaddress}&media_items=false

export const GetallNFTBYwallet = createAsyncThunk(
  "GetallNFTBYwallet",
  async (
    parms: {
      user: string | null | undefined;
      nftaddress: string;
    },
    { dispatch }
  ) => {
    const { user, nftaddress } = parms;
    const baseUrl = `https://polygon-mainnet.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_ID}/getNFTsForOwner`;
    const owner = parms.user;
    const mediaItems = false;
    // const tokenAddresses = single
    //   ? [nftaddress]
    //   : nftaddress.map((e: any) => e.nftcontract);

    const queryParams = [
      `owner=${owner}`,
      `contractAddresses[]=${nftaddress}`,
      'withMetadata=true',
      'pageSize=100'
    ].join("&");

    const finalUrl = `${baseUrl}?${queryParams}`;
    const output = await axios.get(finalUrl, options); 
    const nftArrayFromAPI = output.data.ownedNfts;
    return {nftArrayFromAPI};
  }
);

export const getStakedTokens = createAsyncThunk(
  "getStakedTokens",
  async (
    parms: {
      user: string | null | undefined;
      contract: string;
      nft: any;
      poolId: number;
    },
    { dispatch }
  ) => {
    const instance = await getContractInstance(parms.contract);
    const yourDepositToken = await instance.getStakedTokens(
      parms.poolId,
      parms.user
    );

    const getNftstate: any = NFT.filter((e) => {
      return e.nftcontract == parms.nft;
    });

    const yourDeposit = yourDepositToken.map((e: any) => ({
      tokenId: hexToInt(e),
      image: `https://dweb.link/ipfs/${getNftstate[0].thCID}/${
        getNftstate[0].isSame ? getNftstate[0].name : hexToInt(e)
      }.png`, // Replace "asas" with the actual image URL or source
    }));

    return yourDeposit;
  }
);
