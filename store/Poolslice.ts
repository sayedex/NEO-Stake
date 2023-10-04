import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getALLpool, getSinglepool } from "../store/reducer/getPool";
import { nftdata, Pool } from "../typeing";

export interface PoolsState {
  loading: "idle" | "pending" | "done" | "error";
  pools: Pool[];
  usersellectedID: number[];
  Neobalance:string | undefined,
}

const initialState: PoolsState = {
  loading: "idle",
  pools: [],
  usersellectedID: [],
  Neobalance:"" 
};

// Define the slice for pools data and token prices
const Poolslice = createSlice({
  name: "Poolslice",
  initialState,
  reducers: {
    setModel: (state, action) => {},
    setResetsellectedID: (state) => {
      state.usersellectedID = [];
    },
    AddID: (state, action: PayloadAction<number>) => {
      const nftId = action.payload;
      const isSelected = state.usersellectedID.includes(nftId);
      if (isSelected) {
        state.usersellectedID = state.usersellectedID.filter(
          (id) => id !== nftId
        );
      } else {
        state.usersellectedID.push(nftId);
      }
    },
    updateSinglePoolSuccess: (state, action) => {
      const { updatedPool, poolID } = action.payload;
      state.pools[poolID] = updatedPool;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getALLpool.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getALLpool.fulfilled, (state, action:any) => {
        state.loading = "done";
        const { updatedPools,Tokenbalance} = (action.payload) || {}
        state.pools = updatedPools;
        state.Neobalance = Tokenbalance;
      })
      .addCase(getALLpool.rejected, (state, action) => {
        state.loading = "error";
        console.log(action.payload);
      }),
      builder
        .addCase(getSinglepool.pending, (state,action) => {
          const poolID = action.meta.arg.ID;
          state.pools[poolID].poolloading = true
        })
        .addCase(getSinglepool.fulfilled, (state, action) => {
          const { updatedPool, poolID ,Tokenbalance} = action.payload;
          state.pools[poolID] = updatedPool;
          state.pools[poolID].poolloading = false;
          state.Neobalance = Tokenbalance;
  
        })

        .addCase(getSinglepool.rejected, (state, action) => {
          console.log(action.error, "asas");
        })
  },
});

export const { setModel, AddID, setResetsellectedID } = Poolslice.actions;
export default Poolslice.reducer;
