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


export const GetallNFTBYwallet = createAsyncThunk(
  "GetallNFTBYwallet",
  async (
    parms: {
      user: string | null | undefined;
      nftaddress: any;
      provider: any;
      pool: any;
    },
    { dispatch }
  ) => {
    const nftinstance = await getNFTContractInstanceforhook(
      parms.nftaddress,
      parms.user,
      parms.provider
    );

    
    let tokenIds = [];
    if (parms.pool == 0) {
      const count = hexToInt(await nftinstance.balanceOf(parms.user));
      for (let i = 0; i < count; i++) {
        tokenIds.push(
          hexToInt(await nftinstance.tokenOfOwnerByIndex(parms.user, i))
        );
      }
    } else {
      const res = await nftinstance.walletOfOwner(parms.user);
      res.forEach((element: any) => {
        tokenIds.push(hexToInt(element));
      });
    }



    return tokenIds;
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
    const yourDeposit: [] = yourDepositToken.map((e: any) =>
      hexToInt(e.tokenId)
    );

    return yourDeposit;
  }
);
