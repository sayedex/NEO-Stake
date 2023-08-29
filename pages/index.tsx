import Head from "next/head";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useEffect } from "react";
import { useAppSelector, useAppdispatch } from "../hooks/redux";
import { setModel } from "../store/walletSlice";
import { truncateAddress } from "../utils/format";
//type
import { Pool, Pool as pooltype } from "../typeing";
import { pools } from "../config";
import Poolbox from "../components/pools/Poolbox";
//component
import { Header } from "../components/Header/Header";
export default function Home() {
  const dispatch = useAppdispatch();


  return (
    <div>
      <div className="dark:bg-[#12121200] m-auto w-full ">
  

        <div className="flex flex-wrap justify-center gap-5 m-auto w-full py-20 max-w-7xl">
          {pools.map((e: Pool, indx: any) => {
            return (
                <Poolbox data={e} key={indx} indx={indx} />
            
            );
          })}
        </div>
      </div>
    </div>
  );
}
