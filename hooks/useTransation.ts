import {
  getContractInstanceforhook,
  getNFTContractInstanceforhook,
} from "../utils/Contracthelper";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";
import { provider } from "../utils/providerweb3";

const useDirectCall = (
  signer: any,
  contractaddress: string,
  account: any,
  nft?: string
) => {
  const [loading, setSellTokenLoading] = useState(false);
  const [approve, setapprove] = useState(false);

  const CheckApproval = async (fname: string, args: Array<any>) => {
    if (!nft) return;
    if (!signer) return;
    const name = String(fname);
    //coming from hook
    const myContract = await getNFTContractInstanceforhook(
      nft,
      account,
      signer
    );
    try {
      const response = await myContract?.[name](...args);
      setapprove(response);
    } catch (error) {}
  };

  useEffect(() => {
    CheckApproval("isApprovedForAll", [account, contractaddress]);
  }, [signer, contractaddress, account]);

  const ApprovedForAll = async (fname: string, args: Array<any>) => {
    if (!nft) return;
    const name = String(fname);
    setSellTokenLoading(true);
    //coming from hook
    const myContract = await getNFTContractInstanceforhook(
      nft,
      account,
      signer
    );
    try {
      //  const gasprice =await myContract.estimateGas?.[name](...args,{value: (ethers.utils.parseUnits(Amount))});
      const response = await myContract?.[name](...args);
      const receipt = await response.wait();
      toast.success("Successfully Approved", {
    
      });
      setapprove(true);
      setSellTokenLoading(false);
    } catch (error:any) {
      if(error.code =="ACTION_REJECTED"){
        toast.error("User Cancelled The Trainsaction");
      }else{
        toast.error(error.reason || 'Something went wrong try again');
      }

      setSellTokenLoading(false);
      console.log(error);
      //failed
    }
  };

  const HandleRun = async (
    fname: string,
    args: Array<any>,
    type: string,
    count: number
  ) => {
    const name = String(fname);
    setSellTokenLoading(true);

    //coming from hook
    const myContract = await getContractInstanceforhook(
      contractaddress,
      signer,
      account
    );
    try {
      //  const gasprice =await myContract.estimateGas?.[name](...args,{value: (ethers.utils.parseUnits(Amount))});
      const response = await myContract?.[name](...args);
      const receipt = await response.wait();

      toast.success(
        `Successfully ${type} ${count + (count > 1 ? " nft(s)" : " nft")}!`,
        {
  
        }
      );

      setSellTokenLoading(false);
      return {isDone:true}
    } catch (error:any) {
      setSellTokenLoading(false);
  
      if(error.code =="ACTION_REJECTED"){
        toast.error("User Cancelled The Trainsaction");
      }else{
        toast.error(error.reason || 'Something went wrong try again');
      }
      return {isDone:false}
      //failed
    }
  };

  const claimRewards = async (fname: string, args: Array<any>) => {
    const name = String(fname);
    setSellTokenLoading(true);

    //coming from hook
    const myContract = await getContractInstanceforhook(
      contractaddress,
      signer,
      account
    );
    try {
      //  const gasprice =await myContract.estimateGas?.[name](...args,{value: (ethers.utils.parseUnits(Amount))});
      const response = await myContract?.[name](...args);
      const receipt = await response.wait();
      toast.success("Successfully claimed rewards!", {
      
      });
      setSellTokenLoading(false);
    } catch (error:any) {
     
      if(error.code =="ACTION_REJECTED"){
        toast.error("User Cancelled The Trainsaction");
      }else{
        toast.error(error.reason || 'Something went wrong try again');
      }
      setSellTokenLoading(false);
      //failed
    }
  };

  return { loading, HandleRun, claimRewards, approve, ApprovedForAll };
};

export default useDirectCall;
