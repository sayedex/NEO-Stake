import React, { useEffect } from "react";
import toast from "react-hot-toast";
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
import { useAccount ,useSigner} from "wagmi";


function SelectNFTs({}: Props) {


  const dispatch = useAppdispatch();
  const router = useRouter();
  const { nftbalance, loading, stakedtoken, stakeLoad } = useAppSelector(
    (state) => state.wallet
  );
  const { pools, usersellectedID } = useAppSelector((state) => state.pool);
  const { id, isStake: parmsStake } = router.query || {};
  const { contract, limit, min, max, nftcontract } = pools[Number(id)] || {};
  const isStake = parmsStake === "true";


  const load = isStake ? loading : stakeLoad;
  const { data: library } = useSigner();
   const balance = isStake
    ? nftbalance
     : stakedtoken;

  const {address} = useAccount()

  const {
    loading: isLoading,
    HandleRun,
    approve,
    ApprovedForAll,
  } = useDirectCall(library, contract, address, nftcontract);



  useEffect(() => {
    dispatch(setResetsellectedID());
  }, []);

  const RefetchHelper = () => {
    if (address) {
      dispatch(
        getStakedTokens({ user: address, contract: contract, nft: nftcontract })
      );
    }
  };

  useEffect(() => {
    if(address){
      dispatch(GetallNFTBYwallet({ user:address,provider:library,nftaddress:nftcontract,pool:Number(id)}));
    }
   }, [address,nftcontract,Number(id)]);


const call =()=>{
  if(address){
    dispatch(GetallNFTBYwallet({ user:address,provider:library,nftaddress:nftcontract,pool:Number(id)}));
  }
}

  useEffect(() => {
    RefetchHelper();
  }, [address, isStake]);

  //stake
  const BatchStake = async () => {
    if (!contract && !address) return;
   const stakedbalance = stakedtoken.length;

    if (limit && stakedbalance < min) {
      if (usersellectedID.length >= min && usersellectedID.length <= max) {
        HandleRun("batchStake", [usersellectedID], "staked",usersellectedID.length).then((e) => {
          dispatch(getSinglepool({ user: address, ID: Number(id) }));
          dispatch(GetallNFTBYwallet({ user:address,provider:library,nftaddress:nftcontract,pool:Number(id)}));

          router.push("/");
        });
      } else {
        toast.error(`please select between ${min} and ${max} NFT!`);
      }
    } else {
      //run those mint without any conditions..
      if (usersellectedID.length > 0) {
        HandleRun("batchStake", [usersellectedID], "staked",usersellectedID.length).then((e) => {
          dispatch(getSinglepool({ user: address, ID: Number(id) }));
          dispatch(GetallNFTBYwallet({ user:address,provider:library,nftaddress:nftcontract,pool:Number(id)}));
          router.push("/");
          
        });
      } else {
        toast.error(`You should select at least 1 NFT`);
      }
    }
  };

  const BatchUnStake = async () => {
    if (!contract && !address) return;

    if (usersellectedID.length > 0) {
      HandleRun("batchWithdraw", [usersellectedID], "unstaked",usersellectedID.length).then((e) => {
        dispatch(GetallNFTBYwallet({ user:address,provider:library,nftaddress:nftcontract,pool:Number(id)}));
        dispatch(getSinglepool({ user: address, ID: Number(id) }));
        router.push("/");
      });
    } else {
      toast.error(`You should select at least 1`);
    }
  };

  const Setapprovalall = async () => {
    ApprovedForAll("setApprovalForAll", [contract, 1]);
  };

  return (
    <div className="h-screen md:h-screen overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col items-center h-[70vh] gap-5 pb-[80px] overflow-y-scroll border-[#9061F9] m-auto relative border-[8px] bg-black">
        <div className="flex flex-row flex-wrap flex-auto gap-4 justify-center items-center pt-10 ">
          {load == "done" ? (
            balance.length === 0 ? (
              <p className="font-creepster sm:text-[40px] text-[20px] text-white text-center">
              {isStake?"You don't have any NFTs":"You didn't stake NFTs."}
                <br /> Please mint{" "}
                <span>
                  <a
                    href="https://www.zombabies.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white transition-all hover:text-slate-700"
                  >
                    here
                  </a>
                </span>
              </p>
            ) : (
               balance?.map((e,indx) => {
                return <Nft nft={e} isStake={isStake} nftcontract={nftcontract} key={indx} />;
              })
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
      </div>
      <div className="w-auto flex flex-col p-5 bg-black/70 backdrop-blur-md rounded-l-[10px] gap-2 fixed bottom-5 right-0">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="batchstake bg-[#ff0000] text-white font-semibold"
        >
          Cancel
        </button>
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
    
      </div>
    </div>
  );
}

export default SelectNFTs;
