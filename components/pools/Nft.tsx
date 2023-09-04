import React, { useEffect, useState } from "react";
import { nftdata } from "../../typeing";
import { useAppSelector, useAppdispatch } from "../../hooks/redux";
import { AddID } from "../../store/Poolslice";
import { ConvertLink } from "../../utils/ipfs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholder from "../../public/IMG/layer.png";
import Image from "next/image";
import {NFT} from "../../config/index"
import { json } from "stream/consumers";

type Props = {
  nft: any;
  nftcontract:string | undefined,
  isStake:Boolean

};

export function Nft({ nft,nftcontract,isStake }: Props) {
  const dispatch = useAppdispatch();
  const [metauri, setmetauri] = useState("");
  const [imgload, setimgload] = useState(false);
  const { usersellectedID } = useAppSelector((state) => state.pool);
  const metadata = isStake?JSON.parse(nft.metadata):nft;
 console.log(nft);
 
  

  const isSelected = usersellectedID.includes(Number(nft.token_id));

  const AddToken = () => {
    dispatch(AddID(Number(nft.token_id)));
  };




  

//  useEffect(() => {
//   const getNftstate  = NFT.filter((e)=>{
//     return e.nftcontract ==nftcontract
//   });
//   const firstFilteredObject = getNftstate[0];
//   if(firstFilteredObject){
//     const url =ConvertLink(firstFilteredObject.CID,nft)
//     setmetauri(url);
//   }
//    }, [nft,nftcontract]);




  return (
    <div
      onClick={() => AddToken()}
      className={`transition-all cursor-pointer hover:opacity-60 w-[250px] max-w-full aspect-square bg-black border-[#9061F9] rounded-lg text-white overflow-hidden ${
        isSelected && "border-[6px]"
      }`}
    >
      <LazyLoadImage
        src={ConvertLink(metadata.image)}
        alt=""
        afterLoad={() => {
          setimgload(true);
        }}
        className={`"w-full h-full bg-white`}
      />

      {!imgload && (
        <LazyLoadImage
          loading="lazy"
          afterLoad={() => {}}
          src={placeholder.src}
          alt=""
          className="w-full h-full"
        />
      )}
    </div>
  );
}
