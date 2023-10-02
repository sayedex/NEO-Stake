import { useAppSelector, useAppdispatch } from "../hooks/redux";
import { use, useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { GetallNFTBYwallet } from "../store/reducer/Nftbalance";
import { getALLpool } from "../store/reducer/getPool";
import { NFT } from "../config/index";
import { useAccount, useSigner } from "wagmi";
import { wrapper } from "../store/store";
import { Popup } from "../components/Popup/Popup";
const Layout = (props: any) => {
  const [popup,setpopup] = useState(false);
  const { address } = useAccount();
  const dispatch = useAppdispatch();
  const { data: library } = useSigner();

  useEffect(() => {
    if (address !== null && address !== undefined) {
      dispatch(getALLpool({ user: address }));
    } else {
      dispatch(getALLpool({ user: address }));
    }

  }, [address]);


  useEffect(()=>{
    setpopup(true)
  },[])



  
  return (
    <>
      <Header />
   {popup && <Popup closeModal={()=>setpopup(false)}/>}
      {props.children}
      {/* <Footer/> */}
    </>
  );
};



export default Layout;
