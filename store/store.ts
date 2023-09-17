import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
  Reducer
} from "@reduxjs/toolkit";

import walletslice,{WalletState} from "./walletSlice";
import poolslice,{PoolsState} from "./Poolslice";
import { HYDRATE, createWrapper } from "next-redux-wrapper";

export const combinedReducer = combineReducers({
  wallet: walletslice,
  pool: poolslice,
});

export interface RootState {
  wallet: WalletState;
  pool: PoolsState;
}


const reducer: Reducer<RootState, AnyAction> = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...(state as RootState), // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer,
  });

type Store = ReturnType<typeof makeStore>;
export type AppDispatch = Store["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: true });
