import React, { useEffect, useState } from "react";
import { nftdata } from "../../typeing";
import { useAppSelector, useAppdispatch } from "../../hooks/redux";
import { AddID } from "../../store/Poolslice";
import { ConvertLink } from "../../utils/ipfs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholder from "../../public/IMG/layer.png";
import Image from "next/image";
import { NFT } from "../../config/index";
import { json } from "stream/consumers";

type Props = {
  nft: any;
  nftcontract: string | undefined;
  isStake: Boolean;
};

export function Nft({ nft, nftcontract, isStake }: Props) {
  const dispatch = useAppdispatch();
  const [metauri, setmetauri] = useState("");
  const [imgload, setimgload] = useState(false);
  const { usersellectedID } = useAppSelector((state) => state.pool);
  const metadata = isStake ? JSON.parse(nft.metadata) : nft;

  const isSelected = usersellectedID.includes(Number(nft.token_id));

  const AddToken = () => {
    dispatch(AddID(Number(nft.token_id)));
  };

  const ConvertCID = (CID: any, tokenId: any) => {
    return `https://dweb.link/ipfs/${CID}/${tokenId}.png`;
  };

  useEffect(() => {
    const getNftstate = NFT.filter((e) => {
      return e.nftcontract == nftcontract;
    });
    const firstFilteredObject = getNftstate[0];
    const { CID,isSame,thCID,name}  = firstFilteredObject;
     if (firstFilteredObject) {
    
      if(isStake){
        const url = ConvertCID(CID, isSame?name:nft.token_id);
        setmetauri(url)
      }else{
        const url = ConvertCID(thCID, isSame?name:nft.token_id);
        setmetauri(url)
      }

    }
  }, [nft, nftcontract]);



  return (
    <div
      onClick={() => AddToken()}
      className={`transition-all cursor-pointer hover:opacity-60 w-[250px] max-w-full aspect-square bg-black border-[#9061F9] rounded-lg text-white overflow-hidden ${
        isSelected && "border-[6px]"
      }`}
    >
        <Image
          src={metauri}
          alt="loading.."
          width={300}
          height={300}
          loading="lazy"
          placeholder="blur"
          blurDataURL={placeholder.src}
          onLoadingComplete={() => {
            setimgload(true);
            console.log("done");
            
          }}
          className="w-full h-full bg-white"
        />
   

      {/* {!imgload && (
        <Image
          loading="lazy"
          width={300}
          height={300}
          src={placeholder.src}
          alt=""
          className="w-full h-full"
        />
      )} */}
    </div>
  );
}
