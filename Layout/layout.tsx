import { useAppSelector, useAppdispatch } from "../hooks/redux";
import { use, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { GetallNFTBYwallet } from "../store/reducer/Nftbalance";
import { Injected } from "../connectors/metamask";
import { getALLpool } from "../store/reducer/getPool";
import { useAccount } from "wagmi";

const Layout = (props: any) => {
  const {address}  = useAccount()
  const dispatch = useAppdispatch();

  useEffect(() => {
      dispatch(getALLpool({user:address}))
      }, [address]);
    

  return (
    <div className="   bg-[#1c0030] ">
      <Header />
      {props.children}
      {/* <Footer/> */}
    </div>
  );
};

export default Layout;
