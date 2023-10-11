import Head from "next/head";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
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
  const { loading ,Neobalance} = useAppSelector((state) => state.pool);
  const { address } = useAccount();
  const dispatch = useAppdispatch();
  const [load,setload] = useState(false)

  useEffect(()=>{
setload(true);
  },[])

  const refBalance = async () => {
    if (address !== null && address !== undefined) {
      dispatch(getALLpool({ user: address }));
    } else {
      dispatch(getALLpool({ user: address }));
    }
  };


  return (
    <div>
    <div className="dark:bg-[#12121200] m-auto w-full relative ">
      <div className="flex flex-wrap justify-center gap-5 m-auto w-full pb-36 pt-24 max-w-7xl">
        {pools?.map((e: Pool, indx: any) => {
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
    {load &&  <div className="fixed bigPhone:right-0 bigPhone:left-0  flex justify-center bigPhone:top-[6rem] top-[8rem] sxl:top-[7rem] xl:top-32 md:right-[5vw]  bigPc:right-[18vw]">
    <div className="flex  justify-center text-lg w-fit rounded-2xl whitespace-nowrap  bg-gradient-to-r from-blue-500 to-pink-500">
        <div className="bg-[#160024]  px-3 py-2 m-[2px] rounded-2xl">
            <h1 className="break-all bigPhone:text-sm">
                {`Your Balance : ${address?Number(Neobalance).toFixed(3):0} NEObux`}
            </h1>
        </div>
    </div>
</div>}
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