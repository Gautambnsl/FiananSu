const { ethers } = require("ethers");
import wETHabi from "../middleware/wETH.json";
import ethUsdcabi from "../middleware/BridgeEthUsdc.json";
import filUsdcabi from "../middleware/BridgeFilUsdc.json";
import { getAddress } from "./connect";
import dexAbi from "../middleware/DEX.json";
import { sendNotification } from "./push";

export async function fetchBalanceETH() {
	try {
		console.log("test1");

		const providerETH = new ethers.providers.JsonRpcProvider(
			"https://eth-goerli.g.alchemy.com/v2/swE9yoWrnP9EzbOKdPsJD2Hk0yb3-kDr"
		);
		const providerFIL = new ethers.providers.JsonRpcProvider(
			"https://api.hyperspace.node.glif.io/rpc/v1"
		);

		const address = await getAddress();
		console.log("test 1.5");
		let ETHBalance;
		let FILBalance;
		let wETHBalance;
		await providerETH.getBalance(address).then((balance) => {
			const balanceInEth = ethers.utils.formatEther(balance);
			ETHBalance = balanceInEth;
			console.log(`balance: ${balanceInEth} ETH`);
			console.log("test2");
			console.log("test2");
		});
		await providerFIL.getBalance(address).then((balance) => {
			const balanceInEth = ethers.utils.formatEther(balance);
			FILBalance = balanceInEth;
			console.log(`balance: ${balanceInEth} ETH`);
			console.log("test2");
			console.log("test2");
		});

		console.log("test3");
		const contract = new ethers.Contract(
			"0xc9C214a1BA1c266e632C3274B2c2d33422f3963b",
			wETHabi,
			providerFIL
		);
		wETHBalance = await contract.balanceOf(address);
		wETHBalance = ethers.utils.formatEther(wETHBalance);
		console.log("test4");

		console.log(ETHBalance, "🔥🔥🔥🔥");
		return { ETHBalance, wETHBalance, FILBalance };
	} catch (e) {
		let ETHBalance = "0.00";
		let FILBalance = "0.00";
		let wETHBalance = "0.00";
		return { ETHBalance, wETHBalance, FILBalance };
		console.log(e, "ERROR in fetchBalanceETH 😡😡😡😡😡😡😡😡😡");
	}
}

export async function fetchBalanceUSDC() {
	try {
		const providerETH = new ethers.providers.JsonRpcProvider(
			"https://eth-goerli.g.alchemy.com/v2/swE9yoWrnP9EzbOKdPsJD2Hk0yb3-kDr"
		);

		console.log("testing one");
		const providerFIL = new ethers.providers.JsonRpcProvider(
			"https://api.hyperspace.node.glif.io/rpc/v1"
		);
		console.log("testing two");

		const address = await getAddress();
		let ETHUSDCBalance;
		let FILUSDCBalance;

		const usdcContractEth = new ethers.Contract(
			"0x53af486fA636469F3833102f57eD82CAe26ADfD2",
			ethUsdcabi,
			providerETH
		);
		console.log("testing three");
		const usdcContractFil = new ethers.Contract(
			"0x7D574C8Fc975afCeb6068a93a0B28F70138c92a7",
			filUsdcabi,
			providerFIL
		);
		ETHUSDCBalance = await usdcContractEth.balanceOf(address);
		ETHUSDCBalance = ethers.utils.formatEther(ETHUSDCBalance);
		console.log("testing four");
		FILUSDCBalance = await usdcContractFil.balanceOf(address);
		FILUSDCBalance = ethers.utils.formatEther(FILUSDCBalance);

		console.log("testing five");
		return { ETHUSDCBalance, FILUSDCBalance };
	} catch (e) {
		console.log(e, "ERROR in fetchBalanceUSDC 😡😡😡😡😡😡😡😡😡");
	}
}

export async function transferBridgeBalance(e) {
	try {
		console.log(e);
		let value = ethers.utils.parseUnits(e, 18);
		console.log(value.toString(), "😂😂😂😂");

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		let tx = {
			to: "0x53af486fA636469F3833102f57eD82CAe26ADfD2",
			// Convert currency unit from ether to wei
			value: value.toString(),
		};
		// Send a transaction
		let t = await signer.sendTransaction(tx);
		await t.wait();
		sendNotification(window.ethereum.selectedAddress);
		alert("Success : Assests will be transfered within 2 min");
	} catch (e) {
		console.log(e);
	}
}

export async function approve(e) {
	let value = ethers.utils.parseUnits(e, 18);
	console.log(value.toString(), "😂😂😂😂");
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	const contract = new ethers.Contract(
		"0xc9C214a1BA1c266e632C3274B2c2d33422f3963b",
		wETHabi,
		signer
	);
	let tx = await contract.approve(
		"0xf46dC1A22bEE90f1d0401F55bd0dB2B965605037",
		value
	);
	await tx.wait();
	alert("Approved Success");
}

export async function swapFILtoWETH(e) {
	try {
		let value = ethers.utils.parseUnits(e, 18);
		console.log(value.toString(), "😂😂😂😂");
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(
			"0xf46dC1A22bEE90f1d0401F55bd0dB2B965605037",
			dexAbi,
			signer
		);
		let tx = await contract.ethToToken({ value });
		await tx.wait();
		alert("Swaped Success");
	} catch (e) {
		alert("ERROR");
	}
}
export async function swapWETHtoFIL(e) {
	try {
		let value = ethers.utils.parseUnits(e, 18);
		console.log(value.toString(), "😂😂😂😂");
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(
			"0xf46dC1A22bEE90f1d0401F55bd0dB2B965605037",
			dexAbi,
			signer
		);
		console.log("testing");
		let tx = await contract.tokenToEth(value);
		await tx.wait();
		alert("Swaped Success");
	} catch (e) {
		console.log(e);
		alert("ERROR");
	}
}
