import React, { useState, useEffect } from "react";
import { provider } from "../utils/providerweb3";
import { ToastContainer, toast } from "react-toastify";
import {
  getNeoBoxtokeninstance,
  getBuyContractinstance,
  ConvertEthTonormal,
} from "../utils/Contracthelper";
import { Purchasecontract } from "../config";
//buy contract  - contractaddress

const useBuytransation = (
  signer: any,
  account: any,
  count: any,
  price?: any
) => {
  const [loading, setSellTokenLoading] = useState(false);
  const [balance,setbalance] = useState("0");
  const [approve, setapprove] = useState(false);

  // check approval amount for user

  const CheckApproval = async () => {
    setSellTokenLoading(true);
    const totalprice = Number(count) * Number(price);
    const myContract = await getNeoBoxtokeninstance(false, signer);
    const currentAllowance = await myContract.allowance(
      account,
      Purchasecontract
    );
    const getAmount = await ConvertEthTonormal(currentAllowance);
    if (parseInt(getAmount) >= totalprice) {
      setapprove(true);  
    }else{
        setapprove(false);
    }
    setSellTokenLoading(false);
  };


  // check user balance 

  const CheckBalance = async () => {
    setSellTokenLoading(true);
    const totalprice = Number(count) * Number(price);
    const myContract = await getNeoBoxtokeninstance(false, signer);
    const currentBalance = await myContract.balanceOf(
      account);
    const userBalance = await ConvertEthTonormal(currentBalance);
    setbalance(userBalance);
  
  };

  useEffect(() => {
    CheckApproval();
  }, [signer, account,count,price]);

  useEffect(()=>{
    CheckBalance();
  },[account])


   

  //run func for allowance token  to contract 
  const SetapproveToken = async (fname: string, args: Array<any>) => {
    if (!price && count) return;
    const name = String(fname);
    setSellTokenLoading(true);
    //coming from hook
    const myContract = await getNeoBoxtokeninstance(
      true,
      signer
    );
    try {
      //  const gasprice =await myContract.estimateGas?.[name](...args,{value: (ethers.utils.parseUnits(Amount))});
      const response = await myContract?.[name](...args);
      const receipt = await response.wait();
      toast.success("Successfully Approved");
      CheckApproval();
      setSellTokenLoading(false);
      return {isDone:true}
    } catch (error:any) {
      if(error.code =="ACTION_REJECTED"){
        toast.error("Transaction Cancelled");
      }else{
        toast.error(error.reason || 'Something went wrong try again');
      }

      setSellTokenLoading(false);
      console.log(error);
      return {isDone:false}
  
      //failed
    }
  };



  // run buy func .
  const HandleRun = async (
    fname: string,
    args: Array<any>,
    type: string,
    count: number
  ) => {
    const name = String(fname);
    setSellTokenLoading(true);

    //coming from hook
    const myContract = await getBuyContractinstance(true, signer);
    try {
      //  const gasprice =await myContract.estimateGas?.[name](...args,{value: (ethers.utils.parseUnits(Amount))});
      const response = await myContract?.[name](...args);
      const receipt = await response.wait();

      toast.success(
        `Congratulations! ${type} ${count + (count > 1 ? " nft(s)" : " nft")}!`,
    
      );

      setSellTokenLoading(false);
      return {isDone:true}
    } catch (error:any) {
      if(error.code =="ACTION_REJECTED"){
        toast.error("Transaction Cancelled");
      }else{
        toast.error(error.reason || 'Something went wrong try again');
      }

      setSellTokenLoading(false);
      console.log(error);
      return {isDone:false}
  
      //failed
    }
  };

  return { loading, HandleRun,SetapproveToken ,approve,balance};
};

export default useBuytransation;
