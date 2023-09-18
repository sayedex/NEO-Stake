import React from "react";
import {formatNumber} from "../../utils/format";
import Skeleton from "./Skeleton";
type Props = {
  text: string;
  value: any;
  load:boolean
};

export function Deposit({ text, value,load }: Props) {

  
  return (
    <div className="flex flex-row items-center gap-3 justify-between">
      <div className=" text-white  text-xl ">{text}</div>
     {load? <div className=" text-white  text-left text-xl">
        {value}
      </div>:<Skeleton/>}
    </div>
  );
}

