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
  async (
    parms: {
      user: string | null | undefined;
      nftaddress: any;
      single: boolean;
    },
    { dispatch }
  ) => {
    const { user, nftaddress, single } = parms;
    const baseUrl = `https://deep-index.moralis.io/api/v2.2/${user}/nft`;
    const chain = "mumbai";
    const format = "decimal";
    const mediaItems = false;
    const tokenAddresses = single
      ? [nftaddress]
      : nftaddress.map((e: any) => e.nftcontract);

    const queryParams = [
      `chain=${chain}`,
      `format=${format}`,
      `media_items=${mediaItems}`,
      ...tokenAddresses.map(
        (address: any, index: any) => `token_addresses%5B${index}%5D=${address}`
      ),
    ].join("&");

    const finalUrl = `${baseUrl}?${queryParams}`;
    const output = await axios.get(finalUrl, options);
    const nftArrayFromAPI = output.data.result;
    return nftArrayFromAPI;
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
      token_id: hexToInt(e),
      image: `https://dweb.link/ipfs/${getNftstate[0].thCID}/${
        getNftstate[0].isSame ? getNftstate[0].name : hexToInt(e)
      }.png`, // Replace "asas" with the actual image URL or source
    }));

    return yourDeposit;
  }
);
