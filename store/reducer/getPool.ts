import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import {
  getContractInstance,
  calculatePerDayReward,
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

          return {
            ...pool,
            totaldeposit: hexToInt(_totalStaked),
            rate: parseInt(rate),
            yourdeposit: yourDeposit,
            unclaimed: unclaimed,
            staked:parseInt(_staked.toString())
          };
        } else {
          return {
            ...pool,
            rate: parseInt(rate),
            totaldeposit: hexToInt(_totalStaked),
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

    const updatedPool = {
      ...pool,
      rate: parseInt(rate),
      totaldeposit: hexToInt(_totalStaked),
      yourdeposit: yourDeposit,
      unclaimed: unclaimed,
      staked:parseInt(_staked.toString())
    };

    return { updatedPool, poolID: parms.ID };
  }
);
