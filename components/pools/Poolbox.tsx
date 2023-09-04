import React from "react";
import { Deposit } from "./Deposit";
import { useRouter } from "next/router";
import { Pool } from "../../typeing";
import { useAppSelector } from "../../hooks/redux";
import { formatNumber } from "../../utils/format";
import useDirectCall from "../../hooks/useTransation";
import Skeleton from "./Skeleton";
import { Toast, toast } from "react-hot-toast";
import { useAccount, useSigner } from "wagmi";
import { getSinglepool } from "../../store/reducer/getPool";
import { useAppdispatch } from "../../hooks/redux";


type Props = {
  data: Pool;
  indx: number;
};

function Poolbox({ data, indx }: Props) {
  const dispatch = useAppdispatch();
  const { pools, loading } = useAppSelector((state) => state.pool);
  const { address } = useAccount();
  const router = useRouter();
  const { data: signer } = useSigner();
  const { unclaimed, totaldeposit, yourdeposit, rate } = pools[indx] || {};

  const { contract, name, nftcontract, id, type, typeimg, headerIMG } =
    data || {};

  const {
    loading: isLoading,
    HandleRun,
    claimRewards,
    approve,
  } = useDirectCall(signer, contract, address, nftcontract);
  //stake
  const stake = () => {
    if (address) {
      const queryParams = {
        id: indx,
        isStake: true,
      };
      router.push({
        pathname: "/SelectNFTs",
        query: queryParams,
      });
    } else {
      toast.error("connect your wallet");
    }
  };

  //unstake
  const unstake = () => {
    if (address) {
      const queryParams = {
        id: indx,
        isStake: false,
      };
      router.push({
        pathname: "/SelectNFTs",
        query: queryParams,
      });
    } else {
      toast.error("connect your wallet");
    }
  };

  const claim = async () => {
    if (address) {
      if (unclaimed && Number(unclaimed) > 0) {
        claimRewards("claimRewards").then((e)=>{
          getSingle();
        })
      
      } else {
        toast.error("You don't have enough reward");
      }
    } else {
      toast.error("connect your wallet");
    }
  };

  const getSingle = async()=>{
    dispatch(getSinglepool({user:address,ID:indx}))
  }



  return (
    <div className="m-3  p-[.5px] bg_btn_gr whitespace-nowrap    rounded-2xl relative  ">
      <div className="p-5 m-[1px]  bg-[#20002c] w-[80vw]   whitespace-nowrap rounded-2xl    sm:w-[400px] h-auto    flex flex-col">
        <div className="flex flex-row gap-2 items-end">
          <p className="font-facebisonbold text-center uppercase  text-3xl text-white   tracking-[2px] flex-auto">
            {name}
          </p>
        </div>

        {/* 1st selction */}
        <div className="p-5 flex flex-col gap-y-3">
          {/* total deposit  and user deposit  */}
          <Deposit
            text="Total Staked"
            load={loading == "done"}
            value={totaldeposit}
          />
          <Deposit
            text="Staked"
            load={loading == "done"}
            value={yourdeposit ? yourdeposit.length : 0}
          />
          <Deposit
            text="NeoBux Per/Day"
            load={loading == "done"}
            value={rate}
          />

          {/* unclaimed reward */}
          <div>
            <div className="  text-2xl text-white">
              Unclaimed Rewards:
            </div>
            {loading == "done" ? (
              <div className="text-white text-xl bg-[#3f0349c7] w-fit px-4 py-1 mt-1 ">
                {formatNumber(Number(unclaimed))} NEO
              </div>
            ) : (
              <Skeleton />
            )}
          </div>
          {/* unclaimed reward */}

          {/* claim button */}
          <button
            disabled={isLoading}
            onClick={() => claim()}
            className="transition-all px-6 py-2  border rounded-3xl flex sm:flex-initial flex-1 items-center justify-center  text-white  disabled:cursor-not-allowed uppercase"
          >
        
            {`${isLoading?"Loading..":" Claim Rewards"}`}
          </button>

          {/* claim button */}
        </div>
        {/* 1st selction */}

        {/* 2nd section */}
        <div className=" flex flex-col  gap-y-3">
          <div className="flex flex-wrap justify-center gap-3">
            <button  onClick={()=>stake()} className="stake_btn">
               STAKE
            </button>
            <button onClick={()=>unstake()}  className="stake_btn">
               UnSTAKE
            </button>
          </div>
        </div>
        {/* 2nd section */}
      </div>
    </div>
  );
}

export default Poolbox;
