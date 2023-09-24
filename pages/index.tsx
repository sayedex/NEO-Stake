import Head from "next/head";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useEffect } from "react";
import { useAppSelector, useAppdispatch } from "../hooks/redux";
import { useAccount, useSigner } from "wagmi";
import { setModel } from "../store/walletSlice";
import { truncateAddress } from "../utils/format";
//type
import { Pool, Pool as pooltype } from "../typeing";
import { pools ,poolsDevs} from "../config";
import Poolbox from "../components/pools/Poolbox";
//component
import { Header } from "../components/Header/Header";
import { wrapper } from "../store/store";
import { getALLpool } from "../store/reducer/getPool";

import { isdevsMode } from "../utils/Wagmi";

export default function Home(pros: any) {
  const { loading } = useAppSelector((state) => state.pool);
  const { address } = useAccount();
  const dispatch = useAppdispatch();

  const refBalance = async () => {
    if (address !== null && address !== undefined) {
      dispatch(getALLpool({ user: address }));
    } else {
      dispatch(getALLpool({ user: address }));
    }
  };

  const Pool = isdevsMode?poolsDevs:pools;


  return (
    <div>
    <div className="dark:bg-[#12121200] m-auto w-full relative ">
      <div className="flex flex-wrap justify-center gap-5 m-auto w-full pb-32 pt-20 max-w-7xl">
        {Pool?.map((e: Pool, indx: any) => {
          return <Poolbox data={e} key={indx} indx={indx} />;
        })}
      </div>

      <div className="w-auto flex flex-col p-5 bg-black/70 backdrop-blur-md rounded-l-[10px] gap-2 fixed bottom-3 right-0">
        <button
          disabled={loading == "pending"}
          onClick={() => refBalance()}
          className="batchstake esm:h-[38px] esm:w-[160px] esm:text-sm bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-50 text-white font-semibold"
        >
          Refresh balance
        </button>
      </div>
    </div>
    </div>
  );
}

//  export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
//   console.log('store state on the server before dispatch', store.getState());
//    await store.dispatch(getALLpool({user:""}));
//    console.log('store state on the server after dispatch', store.getState());
//    const data = query.data || 'default data';

//    return {
//     props: {
//       data
//     }
//  };
// });
