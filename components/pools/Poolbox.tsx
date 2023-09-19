import React, { useEffect, useState } from "react";
import { Deposit } from "./Deposit";
import { useRouter } from "next/router";
import { Pool } from "../../typeing";
import { useAppSelector } from "../../hooks/redux";
import { formatNumber } from "../../utils/format";
import useDirectCall from "../../hooks/useTransation";
import Skeleton from "./Skeleton";
import { BasicBuyModal } from "./Buymodel";
import { ToastContainer, toast } from "react-toastify";
import { useAccount, useSigner } from "wagmi";
import { getSinglepool } from "../../store/reducer/getPool";
import { useAppdispatch } from "../../hooks/redux";
import { setModel } from "../../store/walletSlice";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { pools, stakingcontractaddress } from "../../config";
import ScaleLoader from "react-spinners/ScaleLoader";
type Props = {
  data: Pool;
  indx: number;
};

function Poolbox({ data, indx }: Props) {
  const dispatch = useAppdispatch();
  const { pools, loading } = useAppSelector((state) => state.pool);
  const { buymodel } = useAppSelector((state) => state.wallet);
  const { address } = useAccount();
  const router = useRouter();
  const [model, setmodel] = useState(false);

  const { data: signer } = useSigner();
  const {
    unclaimed,
    totaldeposit,
    nftcontract,
    yourdeposit,
    nftBalance,
    rate,
    poolloading,
    rewardnft,
    staked,
    poolId,
  } = pools[indx] || {};

  const { name, id, type, typeimg, headerIMG } = data || {};

  const IsStaked = (staked ? staked : 0) >= 0;
  const IsUnstaked = (staked ? staked : 0) > 0;

  //responsive state
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 550px)" });

  const {
    loading: isLoading,
    HandleRun,
    claimRewards,
    approve,
  } = useDirectCall(signer, stakingcontractaddress, address, nftcontract);
  //stake
  const stake = () => {
    if (loading != "done") return;

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
    if (loading != "done") return;

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
    if (loading != "done") return;
    if (address) {
      if (unclaimed && Number(unclaimed) > 0) {
        claimRewards("claimRewards", [poolId]).then((e) => {
          getSingle();
        });
      } else {
        return;
        toast.error("You don't have enough reward");
      }
    } else {
      toast.error("connect your wallet");
    }
  };

  const setBuymode = () => {
    if (address) {
      setmodel(true);
    } else {
      toast.error("connect your wallet");
    }
  };

  const getSingle = async () => {
    dispatch(getSinglepool({ user: address, ID: indx }));
  };

  return (
    <div className="m-3  p-[.5px] bg_btn_gr whitespace-nowrap    rounded-2xl relative  ">
      <div className="h-[7px]"></div>
      {/* modal for reward nft  */}
      {model && (
        <BasicBuyModal
          rewardnft={rewardnft}
          closeModal={() => setmodel(false)}
        />
      )}
      {/* modal for reward nft  */}

      <div className="p-5 m-[1px]  bg-[#20002c] w-[80vw]   whitespace-nowrap rounded-2xl    sm:w-[400px] h-auto    flex flex-col">
        <div className="flex flex-row gap-2 items-end">
          <p className="font-facebisonbold text-center uppercase  text-3xl text-white   tracking-[2px] flex-auto">
            {name}
          </p>
        </div>

        {/* 1st selction */}
        <div className="p-3 flex flex-col gap-y-3">
          {/* total deposit  and user deposit  */}
          {/* <Deposit
            text="Total Staked"
            load={loading == "done"}
            value={totaldeposit}
          /> */}
          <Deposit
            text={`${
              isTabletOrMobile ? "Eligible NFTs" : "Eligible NFTs to Stake"
            }`}
            load={loading == "done" && !poolloading}
            value={nftBalance ? nftBalance : 0}
          />

          <Deposit
            text={`${
              isTabletOrMobile ? "Staked" : "Total NFTs Currently Staked"
            }`}
            load={loading == "done" && !poolloading}
            value={yourdeposit ? yourdeposit.length : 0}
          />
          <Deposit
            text={`${
              isTabletOrMobile ? "Per/Day" : "NEOBux Estimated Per/Day"
            }`}
            load={loading == "done" && !poolloading}
            value={rate}
          />

          {/* unclaimed reward */}
          <div>
            <div className="  text-xl text-white">Unclaimed NEOBux</div>
            {loading == "done" ? (
              <div className="text-white text-xl bg-[#3f0349c7] w-fit px-4 py-1 mt-1 ">
                {formatNumber(Number(unclaimed))} NEObux
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
            className={`${
              Number(unclaimed) <= 0 ? "opacity-20" : "opacity-100"
            } transition-all px-6 py-2  border rounded-3xl flex sm:flex-initial flex-1 items-center justify-center  text-white  disabled:cursor-not-allowed`}
          >
            {!isLoading && "CLAIM NEOBux"}
            <ScaleLoader
              height={20}
              loading={isLoading}
              color="#ffffff"
              className="text-white"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>

          {/* claim button */}
          <div className=" flex flex-col  gap-y-3">
            <div className="flex flex-wrap justify-center gap-3">
              {IsStaked && (
                <button
                  onClick={() => stake()}
                  className={`stake_btn ${!IsUnstaked ? "w-full" : ""}`}
                >
                  STAKE
                </button>
              )}
              {IsUnstaked && (
                <button
                  onClick={() => unstake()}
                  className={`stake_btn ${!IsStaked ? "w-full" : ""}`}
                >
                  UnSTAKE
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 2nd section */}
        <div className="m-4">
          <button
            onClick={() => {
              if (loading != "done") return;
              setBuymode();
            }}
            className="transition-all px-4 py-2  border w-full rounded-3xl flex sm:flex-initial flex-1 items-center justify-center  text-white  disabled:cursor-not-allowed uppercase"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}

export default Poolbox;
