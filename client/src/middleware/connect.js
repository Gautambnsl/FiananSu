import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { fetchBalance } from "./balances";


export async function connectWallet() {
	try {
		const Provider = await detectEthereumProvider();
		if (Provider) {
			const provider = new ethers.providers.Web3Provider(Provider, "any");
			await provider.send("eth_requestAccounts", []);
			const signer = provider.getSigner();
            //connect
			Provider.on("connect", (ConnectInfo) => window.location.reload());
			//disconect
			Provider.on("disconnect", (ProviderRpcError) => window.location.reload());
			//change address
			Provider.on("accountsChanged", (accounts) => window.location.reload());
			//chain change
			Provider.on("chainChanged", (_chainId) => window.location.reload());

			fetchBalance();

			return { success: true, provider };
		} else {
			return { success: false, msg: "Please install Metamask wallet!" };
		}
	} catch (err) {
		return { success: false, msg: "Trouble connecting wallet!" };
	}
}
