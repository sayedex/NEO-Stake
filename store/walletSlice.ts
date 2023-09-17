import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  GetallNFTBYwallet,
  getStakedTokens,
} from "../store/reducer/Nftbalance";
import { nftdata } from "../typeing";
export interface WalletState {
  loading: "idle" | "pending" | "done" | "error";
  stakeLoad: "idle" | "pending" | "done" | "error";
  nftbalance: any[];
  walletModel: boolean;
  buymodel:boolean
  stakedtoken: nftdata[];
}

const initialState: WalletState = {
  loading: "idle",
  stakeLoad: "idle",
  nftbalance: [],
  stakedtoken: [],
  walletModel: false,
  buymodel:false,
};

// Define the slice for pools data and token prices
const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setModel: (state, action) => {
      state.buymodel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetallNFTBYwallet.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(GetallNFTBYwallet.fulfilled, (state, action) => {
        state.loading = "done";
        state.nftbalance = action.payload;
      })
      .addCase(GetallNFTBYwallet.rejected, (state, action) => {
        console.log(action.error);
        
        state.loading = "error";
      }),
      builder
        .addCase(getStakedTokens.pending, (state) => {
          state.stakeLoad = "pending";
        })
        .addCase(getStakedTokens.fulfilled, (state, action) => {
          state.stakeLoad = "done";
          state.stakedtoken = action.payload;
        })
        .addCase(getStakedTokens.rejected, (state, action) => {
          state.stakeLoad = "error";
          console.log(action.payload);
        });
  },
});

export const { setModel } = walletSlice.actions;
export default walletSlice.reducer;
