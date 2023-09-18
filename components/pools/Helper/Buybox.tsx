import React, { useEffect } from "react";
import Image from "next/image";
import placeholder from "../../../public/IMG/layer.png";
import maticLogo from "../../../public/IMG/polygon-matic-logo.svg";
import { Listinginfo, rewardnft } from "../../../typeing";
import { useState } from "react";
import { getListingDetails, FormatEther } from "../../../utils/Contracthelper";
import { Purchasecontract } from "../../../config";
import { useAccount, useSigner } from "wagmi";
import ScaleLoader from "react-spinners/ScaleLoader";
import {rewardNFTuri} from "../../../config/index"
//hook for run all the transation
import useBuytransation from "../../../hooks/useBuytransation";
import { ToastContainer, toast } from "react-toastify";
import { ConvertLink } from "../../../utils/ipfs";
import LazyloadImage from "../../Imagecom/LazyloadImage";
type Props = {
  data: rewardnft;
};

export function Buybox({ data }: Props) {
  const { data: library } = useSigner();
  const { address } = useAccount();
  const [count, setCount] = useState(1); // Initial state is 0
  const [metadata,setmetadata] = useState("");
  const [initalLoading, setinitalLoading] = useState(false);
  const tokenId = data.tokenid;
  const [listingInfo, setListingInfo] = useState<Listinginfo | null>(null);
  const { loading, SetapproveToken, approve, balance, HandleRun} = useBuytransation(
    library,
    address,
    count,
    listingInfo?.value
  );

  useEffect(()=>{

    const uri = `${rewardNFTuri}${data.imgName}.png`;
    setmetadata(ConvertLink(uri))
    console.log(uri);
    

  },[data])


  useEffect(() => {
    async function fetchListingInfo(tokenId: any) {
      try {
        setinitalLoading(true);
        const rewardState = await getListingDetails(tokenId, Purchasecontract);
        setListingInfo(rewardState);
        setinitalLoading(false);
      } catch {
        setinitalLoading(false);
      }
    }

    fetchListingInfo(tokenId);
  }, [tokenId]);

  // Function to increment the count
  const increment = () => {
    if (!listingInfo) return;
    if (count < listingInfo?.maxLimit) {
      setCount(count + 1);
    }
  };

  // Function to decrement the count
  const decrement = () => {
    if (!listingInfo) return;
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // call approve func
  const Approve = async () => {
    if (!address && !listingInfo) return;
    const _amount = Number(listingInfo?.value) * Number(count);
    const amount = await FormatEther(_amount);
    await SetapproveToken("approve", [Purchasecontract, amount]);
  };

  const BuyNft = async () => {
    if (!address && !listingInfo) return;
    await HandleRun("buyNFT", [tokenId, count],"You have purchased",count);
  };

  const CallBlockchian = () => {
    if (approve) {
      const _amount = Number(listingInfo?.value) * Number(count);
      if (parseInt(balance) >= _amount) {
        // run buy func...
        BuyNft();
      } else {
        console.log("low balance");
        
        //show allet
        toast.error("Insufficient balance. Please top up your account.",{
          position: "bottom-right",
        });

      }
    } else {
      Approve();
      // run approve func
    }
  };

  return (
    <div className="border bg-[#1a1c1f]  border-gray-800 rounded-xl relative hover:bg-secondary-dark h-fit">
      {/* image  */}
      <div className="w-[50vw] md:w-[400px] rounded-2xl p-2">
       <LazyloadImage src={metadata} isRound={true}/>
      </div>
      {/* image  */}

      {/* price  */}
      <div className="flex justify-between p-3 cursor-default text-gray-400">
        <div className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
          <div className="flex items-center gap-1 mb-1">
            <div className="whitespace-nowrap overflow-hidden text-ellipsis hover:text-gray-200 transition-colors cursor-pointer">
              {data.name} #{tokenId}
            </div>
          </div>{" "}
          <div className="flex justify-between items-center gap-1">
            <div className="flex items-center gap-1 h-[14px] text-black dark:text-white">
              <div className="flex items-center w-[15px]">
                <Image
                  className="flex items-center w-full h-full"
                  src={maticLogo.src}
                  width={16}
                  height={16}
                  alt="matic"
                />
              </div>
              <div className="font-semibold text-[1rem] text-white">
                {listingInfo?.value}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* price  */}

      {/* buySell */}

      <div className="flex flex-row items-center justify-center gap-5 m-auto">
        <div className="incredrementbtn " onClick={() => decrement()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15"
            />
          </svg>
        </div>
        <div className="text-xl">{count}</div>

        <div className="incredrementbtn" onClick={() => increment()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>

      {/* buySell */}

      {/* buy button */}
      <div className="mt-3">
        {!approve && (
          <button
            onClick={() => CallBlockchian()}
            className="ransition-all w-full h-[44px] bg-[#363636] hover:bg-[#393939] rounded-[10px]"
          >
            {!loading && "Approve"}
            <ScaleLoader
              height={30}
              loading={loading}
              color="#ffffff"
              className="text-white"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
        )}
        {approve && (
          <button
            onClick={() => CallBlockchian()}
            className="ransition-all w-full h-[44px] bg-[#363636] hover:bg-[#393939] rounded-[10px]"
          >
            {!loading && "Buy"}
            <ScaleLoader
              height={30}
              loading={loading}
              color="#ffffff"
              className="text-white"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
        )}
      </div>

      {/* buy button */}
    </div>
  );
}
