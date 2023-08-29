import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { Web3Provider } from "@ethersproject/providers";
import store from "../store/store";
import { Provider } from "react-redux";
import Layout from "../Layout/layout";
import toast, { Toaster } from "react-hot-toast";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
} from "connectkit";
import { client } from "../utils/Wagmi";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <ThemeProvider attribute="class">
      <WagmiConfig client={client}>


        <Toaster />
        <ConnectKitProvider>
        <Provider store={store}>
    
  
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
        </ConnectKitProvider>
      </WagmiConfig>

    // </ThemeProvider>
  );
}
