import { getContractInstanceforhook,getNFTContractInstanceforhook } from "../utils/Contracthelper";
import React, { useState, useEffect } from "react";
import { Toast, toast } from "react-hot-toast";
import { ethers } from "ethers";
import ercabi from "../config/ABI/erc721.json";
import { provider } from "../utils/providerweb3";

const useDirectCall = (signer: any, contractaddress: string,account:any,nft?:string) => {
  const [loading, setSellTokenLoading] = useState(false);
  const [approve,setapprove] = useState(false);

   const CheckApproval = async (fname: string, args: Array<any>) => {
    if(!nft ) return;
    if(!signer) return;
     const name = String(fname);
    //coming from hook
    const myContract = await getNFTContractInstanceforhook(nft,account,signer);
    try {
      const response = await myContract?.[name](...args);
      setapprove(response)
   } catch (error) {
  
   }
 };

useEffect(()=>{
  CheckApproval("isApprovedForAll",[account,contractaddress]);
},[signer,contractaddress,account])



const ApprovedForAll = async (fname: string, args: Array<any>) => {
  if(!nft) return;
  const name = String(fname);
  setSellTokenLoading(true);
  //coming from hook
  const myContract = await getNFTContractInstanceforhook(nft,account,signer);
  try {
    //  const gasprice =await myContract.estimateGas?.[name](...args,{value: (ethers.utils.parseUnits(Amount))});
    const response = await myContract?.[name](...args);
    const receipt = await response.wait();
    toast.success(
     "Successfully Approved",
    {
      duration:2000
    }
    );
    setapprove(true)
    setSellTokenLoading(false);
  } catch (error) {
    setSellTokenLoading(false);
    console.log(error);
    toast.error("Something went wrong try again");
    //failed
  }
};




  const HandleRun = async (fname: string, args: Array<any>,type:string,count:number) => {
    const name = String(fname);
    setSellTokenLoading(true);

    console.log(count);
    


    //coming from hook
    const myContract = await getContractInstanceforhook(contractaddress, signer,account);
    try {
      //  const gasprice =await myContract.estimateGas?.[name](...args,{value: (ethers.utils.parseUnits(Amount))});
      const response = await myContract?.[name](...args);
      const receipt = await response.wait();

      toast.success(
        `Successfully ${type} ${
          count +
          (count > 1 ? " nft(s)" : " nft")
        }!`
        , {
          duration:3000
        }
      );


      setSellTokenLoading(false);
    } catch (error) {
      setSellTokenLoading(false);
      console.log(error);
      toast.error("Something went wrong try again");
      //failed
    }
  };

  const claimRewards = async (fname: string) => {
    const name = String(fname);
    setSellTokenLoading(true);

    //coming from hook
    const myContract = await getContractInstanceforhook(contractaddress, signer,account);
    try {
      //  const gasprice =await myContract.estimateGas?.[name](...args,{value: (ethers.utils.parseUnits(Amount))});
      const response = await myContract?.[name]();
      const receipt = await response.wait();
      toast.success("Successfully claimed rewards!",{
        duration:3000
      });
      setSellTokenLoading(false);
    } catch (error) {
      setSellTokenLoading(false);
      console.log(error);
      toast.error("Something went wrong try again");
      //failed
    }
  };


  return { loading, HandleRun ,claimRewards,approve,ApprovedForAll};
};

export default useDirectCall;
