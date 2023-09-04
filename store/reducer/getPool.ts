import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { getContractInstance } from "../../utils/Contracthelper";
import { pools } from "../../config";
import { hexToInt } from "../../utils/format";
export const getALLpool = createAsyncThunk(
  "getAllPoolupdate",
  async (parms: { user: string | any }, { dispatch }) => {
    const promises = pools.map(async (pool) => {
   
      const instance = await getContractInstance(pool.contract);
      const totalDeposit = await instance.totalStaked();
      const getRate = await instance.rewardperday();
      const rate= await ethers.utils.formatUnits(getRate, 18);

      console.log(rate);
      

      if (parms.user) {
        const yourDepositToken = await instance.getStakedTokens(parms.user);
        const yourDeposit:[] = yourDepositToken.map((e: any) =>
          hexToInt(e.tokenId)
        );
        
        const unclaimedState = await instance.availableRewards(parms.user);
        const unclaimed = await ethers.utils.formatUnits(unclaimedState, 18);


        return {
          ...pool,
          totaldeposit: hexToInt(totalDeposit),
          rate:parseInt(rate),
          yourdeposit: yourDeposit,
          unclaimed: unclaimed,
        };
      } else {
  
        return {
          ...pool,
          rate:parseInt(rate),
          totaldeposit: hexToInt(totalDeposit),
        };
      }
    });
    const updatedPools = await Promise.all(promises);
    
    
    return updatedPools;
  }
);



export const getSinglepool = createAsyncThunk(
  "getSinglepool",
  async (parms: { user: string | any,ID:number }, { dispatch }) => {
    const pool =pools[parms.ID];
    const instance = await getContractInstance(pool.contract);

    const unclaimedState = await instance.availableRewards(parms.user);
    const unclaimed = await ethers.utils.formatUnits(unclaimedState, 18);
    const totalDeposit = await instance.totalStaked();
    const getRate = await instance.getMonthlyRate(parms.user);
    const rate= await ethers.utils.formatUnits(getRate, 18);
    const yourDepositToken = await instance.getStakedTokens(parms.user);
    
    const yourDeposit:[] = yourDepositToken.map((e: any) =>
      hexToInt(e.tokenId)
    );
    console.log(yourDepositToken);

    const updatedPool = {
      ...pool,
      rate:rate,
      totaldeposit: hexToInt(totalDeposit),
      yourdeposit: yourDeposit,
      unclaimed: unclaimed,
    };
    
    return {updatedPool,poolID:parms.ID};
  
  }
);