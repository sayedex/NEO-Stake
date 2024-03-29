import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAppSelector, useAppdispatch } from "../hooks/redux";
import { useRouter } from "next/router";
import { filterNFTsForStake } from "../utils/Contracthelper";
import { AddID } from "../store/Poolslice";
import { Nft } from "../components/pools/Nft";
import { Spinner } from "flowbite-react";
import useDirectCall from "../hooks/useTransation";
import { setResetsellectedID } from "../store/Poolslice";
import {
  GetallNFTBYwallet,
  getStakedTokens,
} from "../store/reducer/Nftbalance";
import { getSinglepool } from "../store/reducer/getPool";
type Props = {};
import { useAccount, useSigner } from "wagmi";
import { pools, stakingcontractaddress } from "../config/index";

function SelectNFTs({}: Props) {
  const dispatch = useAppdispatch();
  const router = useRouter();
  const { poolnftbalance, loading, stakedtoken, stakeLoad } = useAppSelector(
    (state) => state.wallet
  );
  const { pools, usersellectedID } = useAppSelector((state) => state.pool);
  const { id, isStake: parmsStake } = router.query || {};
  const { limit, min, max, nftcontract, poolId } = pools[Number(id)] || {};
  const isStake = parmsStake === "true";


  const load = isStake ? loading : stakeLoad;
  const { data: library } = useSigner();
  const balance = isStake ? poolnftbalance : stakedtoken;

  const { address } = useAccount();

  const {
    loading: isLoading,
    HandleRun,
    approve,
    ApprovedForAll,
  } = useDirectCall(library, stakingcontractaddress, address, nftcontract);

  useEffect(() => {
    dispatch(setResetsellectedID());
  }, []);

  const RefetchHelper = () => {
    if (address) {
      dispatch(
        getStakedTokens({
          user: address,
          contract: stakingcontractaddress,
          nft: nftcontract,
          poolId: poolId,
        })
      );
    }
  };

  useEffect(() => {
    if (address && nftcontract && isStake) {
      dispatch(
        GetallNFTBYwallet({
          user: address,
          nftaddress: nftcontract,
    
        })
      );
    }
  }, [address, nftcontract, Number(id)]);


  useEffect(() => {
   if(!isStake){
    RefetchHelper();
   }
  }, [address, isStake]);

  //stake
  const BatchStake = async () => {
    if (!address) return;
    //run those mint without any conditions..
    if (usersellectedID.length > 0) {
      // run limit condition
      if (limit && usersellectedID.length <= max) {
        HandleRun(
          "stake",
          [poolId, usersellectedID],
          "staked",
          usersellectedID.length
        ).then((e) => {
          if (e.isDone) {
            dispatch(getSinglepool({ user: address, ID: Number(id) }));
            router.push("/");
          }
        });
      } else {
        toast.error(`Max stake limit reached!`);
      }
    } else {
      toast.error(`You should select at least 1 NFT`);
    }
  };

  const BatchUnStake = async () => {
    if (!address) return;

    if (usersellectedID.length > 0) {
      if (limit && usersellectedID.length <= max) {
        HandleRun(
          "withdraw",
          [poolId, usersellectedID],
          "unstaked",
          usersellectedID.length
        ).then((e) => {
          dispatch(getSinglepool({ user: address, ID: Number(id) }));
          if (e.isDone) {
            router.push("/");
          }
        });
      } else {
        toast.error(`Max stake limit reached!`);
      }
    } else {
      toast.error(`You should select at least 1`);
    }
  };

  const Setapprovalall = async () => {
    ApprovedForAll("setApprovalForAll", [stakingcontractaddress, 1]);
  };

  return (
    <div className="h-screen md:h-screen overflow-hidden relative">
      <div className="max-w-7xl w-full flex flex-col items-center h-[70vh] gap-5   overflow-y-scroll border-[#9061F9] m-auto relative border-[8px] bg-black">
        <div className="flex flex-row flex-wrap  flex-auto gap-4 justify-center items-center pt-10 ">
          {load == "done" ? (
            balance.length === 0 ? (
              <p className="font-creepster sm:text-[40px] text-[20px] text-white text-center">
                {isStake ? "You don't have any NFTs" : "You didn't stake NFTs."}
              </p>
            ) : (
              <div>
                <div className="flex flex-row flex-wrap flex-auto gap-4 justify-center items-center pt-10">
                  {balance?.map((e: any, indx: any) => {
                    return (
                      <Nft
                        nft={e}
                        isStake={isStake}
                        nftcontract={nftcontract}
                        key={indx}
                      />
                    );
                  })}
        
                </div>
              </div>
            )
          ) : (
            <div className="flex flex-row justify-center items-center font-creepster sm:text-[30px] text-[20px] text-white">
              <Spinner
                className="mr-3"
                color="success"
                aria-label="Extra large Success spinner example"
                size="xl"
              />{" "}
              Please Wait...
            </div>
          )}

        </div>
        {load == "done" && balance.length != 0 && (
          <div className=" sticky bottom-[-1vh]  max-w-7xl mx-auto bg-black w-full px-2 text-center py-5">
            <h1 className="text-2xl">{`Please select the NFT(s) you would like to ${
              isStake ? "stake" : "unstake"
            }`}</h1>
          </div>
        )}
  
      
      </div>
      <div className="w-auto flex flex-col p-5 bg-black/70 backdrop-blur-md rounded-l-[10px] gap-2 fixed bottom-5 right-0">
        {approve ? (
          <button
            disabled={isLoading}
            onClick={() => {
              isStake ? BatchStake() : BatchUnStake();
            }}
            className="stake_btn w-full"
          >
            {isLoading ? (
              <Spinner
                color="success"
                aria-label="Extra large Success spinner example"
                size="md"
              />
            ) : (
              `Batch ${isStake ? "Stake" : "Unstake"} ${
                usersellectedID.length
              } NFTs`
            )}
          </button>
        ) : (
          <button
            onClick={() => Setapprovalall()}
            disabled={isLoading}
            className="stake_btn w-full"
          >
            {isLoading ? (
              <Spinner
                color="success"
                aria-label="Extra large Success spinner example"
                size="md"
              />
            ) : (
              "Approve"
            )}
          </button>
        )}

        <button
          onClick={() => {
            router.push("/");
          }}
          className="batchstake bg-[#ff0000] hover:bg-[#8c0b0b] text-white font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default SelectNFTs;



{/* <div className="fixed top-32  md:right-60  flex justify-center  text-lg  rounded-2xl whitespace-nowrap  bg-gradient-to-r from-blue-500 to-pink-500 ">
<div className="bg-[#160024] px-3 py-2 m-[2px] rounded-2xl">
{    `Your Balance : ${Number(Neobalance).toFixed(3)} NEObux`}
</div>
</div> */}