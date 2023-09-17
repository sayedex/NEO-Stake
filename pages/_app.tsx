import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from "next/app";
import { Web3Provider } from "@ethersproject/providers";
import {makeStore} from "../store/store";
import { Provider } from "react-redux";
import Layout from "../Layout/layout";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { ConnectKitProvider, ConnectKitButton } from "connectkit";
import { client } from "../utils/Wagmi";
import { wrapper } from "../store/store";
import { ToastContainer, toast } from "react-toastify";

function App({ Component, pageProps }: AppProps) {
  return (
    // <ThemeProvider attribute="class">
    <WagmiConfig client={client}>
 
      <ConnectKitProvider>
        {/* <Provider store={makeStore}> */}
          <Layout>
          <ToastContainer />
            <Component {...pageProps} />
          </Layout>
        {/* </Provider> */}
      </ConnectKitProvider>
    </WagmiConfig>

    // </ThemeProvider>
  );
}
export default wrapper.withRedux(App);
