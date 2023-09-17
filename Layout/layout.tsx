import { useAppSelector, useAppdispatch } from "../hooks/redux";
import { use, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { GetallNFTBYwallet } from "../store/reducer/Nftbalance";
import { getALLpool } from "../store/reducer/getPool";
import { NFT } from "../config/index";
import { useAccount, useSigner } from "wagmi";
import { wrapper } from "../store/store";

const Layout = (props: any) => {
  const { address } = useAccount();
  const dispatch = useAppdispatch();
  const { data: library } = useSigner();

  useEffect(() => {
    if (address !== null && address !== undefined) {
      dispatch(getALLpool({ user: address }));
      dispatch(
        GetallNFTBYwallet({ user: address, nftaddress: NFT, single: false })
      );
    } else {
      dispatch(getALLpool({ user: address }));
    }
  }, [address]);




  
  return (
    <>
      <Header />
      {props.children}
      {/* <Footer/> */}
    </>
  );
};



export default Layout;
