import { configureStore } from '@reduxjs/toolkit';
import walletSlice from "./walletSlice";
import Poolslice from "./Poolslice"
const store = configureStore({
    reducer: {
        wallet:walletSlice,
        pool:Poolslice

    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch =  typeof store.dispatch