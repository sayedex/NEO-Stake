import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import {
  getContractInstance,
  calculatePerDayReward,
  getStakeNFTinstance,
} from "../../utils/Contracthelper";
import { pools, stakingcontractaddress } from "../../config";
import { hexToInt } from "../../utils/format";
export const getALLpool = createAsyncThunk(
  "getAllPoolupdate",
  async (parms: { user: string | any }, { dispatch }) => {
    try {
      const promises = pools.map(async (pool) => {
        const poolID = pool.poolId;
        const instance = await getContractInstance(stakingcontractaddress);
        const { _timeUnit, _rewardsPerUnitTime, _totalStaked } =
          await instance.getPoolinfo(poolID);
        const timeInreward = _timeUnit.toString();
        const RewardsPerUnit = await ethers.utils.formatUnits(
          _rewardsPerUnitTime,
          18
        );
        const rate = calculatePerDayReward(RewardsPerUnit, timeInreward);

        if (parms.user) {
          const yourDepositToken = await instance.getStakedTokens(
            poolID,
            parms.user
          );
          const yourDeposit: [] = yourDepositToken.map((e: any) => hexToInt(e));
          const { _rewards, _staked } = await instance.getUser(
            poolID,
            parms.user
          );
          const unclaimed = await ethers.utils.formatUnits(_rewards, 18);

          // get nft contract instance..
          const NFTinstance = await getStakeNFTinstance(pool.nftcontract);
          const balanceOFnft = await NFTinstance.balanceOf(parms.user);

          // get user Stake limit 
          const MaxLimit  = await instance.MaxTx();
        
          console.log(rate);
          


          return {
            ...pool,
            totaldeposit: hexToInt(_totalStaked),
            rate: (rate),
            yourdeposit: yourDeposit,
            unclaimed: unclaimed,
            staked: parseInt(_staked.toString()),
            nftBalance: parseInt(balanceOFnft.toString()),
            max:parseInt(MaxLimit.toString()),
            poolloading:false
          };
        } else {
          return {
            ...pool,
            rate: (rate),
            totaldeposit: hexToInt(_totalStaked),
            poolloading:false
          };
        }
      });
      const updatedPools = await Promise.all(promises);

      return updatedPools;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
);

export const getSinglepool = createAsyncThunk(
  "getSinglepool",
  async (parms: { user: string | any; ID: number }, { dispatch }) => {
    const pool = pools[parms.ID];

    //new state

    const poolID = pool.poolId;
    const instance = await getContractInstance(stakingcontractaddress);
    const { _timeUnit, _rewardsPerUnitTime, _totalStaked } =
      await instance.getPoolinfo(poolID);
    const timeInreward = _timeUnit.toString();
    const RewardsPerUnit = await ethers.utils.formatUnits(
      _rewardsPerUnitTime,
      18
    );
    const rate = calculatePerDayReward(RewardsPerUnit, timeInreward);

    const { _rewards, _staked } = await instance.getUser(poolID, parms.user);
    const unclaimed = await ethers.utils.formatUnits(_rewards, 18);

    const yourDepositToken = await instance.getStakedTokens(poolID, parms.user);
    const yourDeposit: [] = yourDepositToken.map((e: any) => hexToInt(e));
    // get nft contract instance..
    const NFTinstance = await getStakeNFTinstance(pool.nftcontract);
    const balanceOFnft = await NFTinstance.balanceOf(parms.user);

          // get user Stake limit 
          const MaxLimit  = await instance.MaxTx();

    const updatedPool = {
      ...pool,
      rate: (rate),
      totaldeposit: hexToInt(_totalStaked),
      yourdeposit: yourDeposit,
      unclaimed: unclaimed,
      staked: parseInt(_staked.toString()),
      nftBalance: parseInt(balanceOFnft.toString()),
      max:parseInt(MaxLimit.toString()),

    }
    return { updatedPool, poolID: parms.ID };
  }
);
