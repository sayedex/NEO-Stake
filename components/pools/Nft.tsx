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
import { ConvertCID } from "../../utils/ipfs";
import LazyloadImage from "../Imagecom/LazyloadImage";
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


  useEffect(() => {
    const getNftstate = NFT.filter((e) => {
      return e.nftcontract == nftcontract;
    });
    const firstFilteredObject = getNftstate[0];
    const { CID, isSame, thCID, name } = firstFilteredObject;
    if (firstFilteredObject) {
      if (isStake) {
        const url = ConvertCID(CID, isSame ? name : nft.token_id);
        setmetauri(url);
      } else {
        const url = ConvertCID(thCID, isSame ? name : nft.token_id);
        setmetauri(url);
      }
    }
  }, [nft, nftcontract]);

  return (
    <div
      onClick={() => AddToken()}
      className={`transition-all cursor-pointer hover:opacity-60 w-[250px] max-w-full   bg-black border-[#9061F9]  text-white overflow-hidden ${
        isSelected && "border-[6px]"
      }`}
    >
      <LazyloadImage src={metauri} height={250}/>
    </div>
  );
}
