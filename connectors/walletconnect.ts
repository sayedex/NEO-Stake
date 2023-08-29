import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'




const RPC_URLS: { [chainId: number]: string } = {
	25: 'https://cronos-evm.publicnode.com',
	// 1:"https://eth-mainnet.g.alchemy.com/v2/VEX4K9WybpzqhfnpF_DhNw2LVyrm6jdP"
  }

export const walletconnect = new WalletConnectConnector({
	rpc: RPC_URLS,
	// infuraId:"",
	bridge: 'https://bridge.walletconnect.org',
	qrcode: true,
	chainId: 25,
	// pollingInterval: 15000
});



export function resetWalletConnector(connector:any) {
	if (connector && connector instanceof WalletConnectConnector) {
		connector.walletConnectProvider = undefined;
	}
}
